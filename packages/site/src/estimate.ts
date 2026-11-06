import { createHash, randomBytes } from 'node:crypto';
import { getBusinessSettings, isEmail } from './business';
import type { SiteConfig } from './types';

export type EstimateField = 'name' | 'phone' | 'email' | 'city' | 'projectType' | 'squareFootage' | 'details' | 'preferredContact' | 'consent';
export type EstimateErrors = Partial<Record<EstimateField, string>>;
type Estimate = {
  name: string; phone: string; email: string; city: string; projectType: string;
  squareFootage: string; details: string; preferredContact: string; consent: boolean;
  website: string; startedAt: number;
};
type DeliveryDependencies = {
  env?: NodeJS.ProcessEnv;
  fetch?: typeof globalThis.fetch;
  now?: () => number;
  rateLimit?: (key: string, now: number) => boolean;
};
const MAX_BODY = 16_384;
const WINDOW = 15 * 60 * 1000;
// A per-process salt makes retained requester hashes unsuitable for an IP lookup table.
const requesterSalt = randomBytes(32);
const attempts = new Map<string, { count: number; expires: number }>();

function allowAttempt(key: string, now: number) {
  for (const [entry, value] of attempts) if (value.expires <= now) attempts.delete(entry);
  const previous = attempts.get(key);
  if (previous) {
    previous.count++;
    return previous.count <= 5;
  }
  // Bound memory usage; production must also rate-limit at the hosting edge.
  if (attempts.size >= 5000) return false;
  attempts.set(key, { count: 1, expires: now + WINDOW });
  return true;
}

function json(status: number, body: object, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function textField(input: Record<string, unknown>, name: string): string {
  return typeof input[name] === 'string' ? input[name].trim() : '';
}

function requestOrigin(request: Request): string | undefined {
  const requestUrl = new URL(request.url);
  const host = request.headers.get('host');
  if (!host) return requestUrl.origin;
  // Next can expose its bind address in request.url. The incoming Host is the
  // browser's actual target; forwarded headers and Origin are never used here.
  if (!/^(?:[a-z\d.-]+|\[[a-f\d:]+\])(?::\d{1,5})?$/i.test(host)) return undefined;
  try { return new URL(`${requestUrl.protocol}//${host}`).origin; }
  catch { return undefined; }
}

function parseEstimate(input: Record<string, unknown>): Estimate {
  return {
    name: textField(input, 'name'), phone: textField(input, 'phone'), email: textField(input, 'email'),
    city: textField(input, 'city'), projectType: textField(input, 'projectType'),
    squareFootage: textField(input, 'squareFootage'), details: textField(input, 'details'),
    preferredContact: textField(input, 'preferredContact'), consent: input.consent === true,
    website: textField(input, 'website'), startedAt: typeof input.startedAt === 'number' ? input.startedAt : 0,
  };
}

function validate(input: Estimate, config: SiteConfig): EstimateErrors {
  const errors: EstimateErrors = {};
  if (input.name.length < 2 || input.name.length > 100 || /[\r\n]/.test(input.name)) errors.name = 'Enter your full name (2–100 characters).';
  if (!/^[+\d().\s-]{7,30}$/.test(input.phone) || input.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone number with at least 7 digits.';
  if (!isEmail(input.email)) errors.email = 'Enter a valid email address.';
  if (input.city.length < 2 || input.city.length > 100 || /[\r\n]/.test(input.city)) errors.city = 'Enter your city or area (2–100 characters).';
  if (input.projectType !== 'not-sure' && !config.services.some(service => service.slug === input.projectType)) errors.projectType = 'Choose a flooring project type.';
  if (input.squareFootage && (!/^\d{1,6}$/.test(input.squareFootage) || Number(input.squareFootage) < 1)) errors.squareFootage = 'Enter a whole number from 1 to 999,999, or leave this blank.';
  if (input.details.length < 10 || input.details.length > 4000) errors.details = 'Tell us a little about your project (10–4,000 characters).';
  if (!['email', 'phone'].includes(input.preferredContact)) errors.preferredContact = 'Choose email or phone.';
  if (!input.consent) errors.consent = 'Please agree to be contacted about this request.';
  return errors;
}

async function limitedJson(request: Request): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY) throw new RangeError('Payload too large');
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('Missing body');
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw new RangeError('Payload too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  const parsed: unknown = JSON.parse(new TextDecoder().decode(body));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new SyntaxError('Expected an object');
  return parsed as Record<string, unknown>;
}

export async function handleEstimate(request: Request, config: SiteConfig, dependencies: DeliveryDependencies = {}): Promise<Response> {
  const env = dependencies.env ?? process.env;
  const now = (dependencies.now ?? Date.now)();
  const settings = getBusinessSettings(env);
  if (request.method !== 'POST') return json(405, { message: 'Use the estimate form to send a request.' }, { Allow: 'POST' });
  const origin = request.headers.get('origin');
  const expectedOrigin = settings.siteUrl ?? requestOrigin(request);
  if (!origin || origin !== expectedOrigin || request.headers.get('sec-fetch-site') === 'cross-site') {
    return json(403, { message: 'Please send your request from this website.' });
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json(415, { message: 'The request must use JSON.' });
  const requester = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const key = createHash('sha256').update(requesterSalt).update(`${config.id}:${requester}`).digest('hex');
  if (!(dependencies.rateLimit ?? allowAttempt)(key, now)) return json(429, { message: 'Too many requests. Please wait 15 minutes before trying again.' }, { 'Retry-After': '900' });
  let raw: Record<string, unknown>;
  try { raw = await limitedJson(request); }
  catch (error) { return json(error instanceof RangeError ? 413 : 400, { message: error instanceof RangeError ? 'Your request is too long. Please shorten your project details.' : 'We could not read your request. Please try again.' }); }
  const input = parseEstimate(raw);
  if (input.website || !Number.isFinite(input.startedAt) || now - input.startedAt < 2000 || now - input.startedAt > 2 * 60 * 60 * 1000) {
    return json(400, { message: 'Please refresh the page, take a moment to complete the form, and try again. Your request has not been sent.' });
  }
  const errors = validate(input, config);
  if (Object.keys(errors).length) return json(400, { message: 'Please check the highlighted fields.', errors });
  if (!settings.deliveryAvailable) return json(503, { message: 'Online estimate requests are not available yet. Your request has not been sent. Please use a listed contact option if available.' });

  const projectTitle = input.projectType === 'not-sure' ? 'Not sure yet' : config.services.find(item => item.slug === input.projectType)!.title;
  const text = [
    `New estimate request for ${config.name}`, '',
    `Full name: ${input.name}`, `Phone: ${input.phone}`, `Email: ${input.email}`,
    `City / area: ${input.city}`, `Project: ${projectTitle}`,
    `Approximate square footage: ${input.squareFootage || 'Not provided'}`,
    `Preferred contact: ${input.preferredContact}`, '', 'Project details:', input.details, '',
    'The sender agreed to be contacted about this estimate request. This is not marketing consent.',
  ].join('\n');
  try {
    const result = await (dependencies.fetch ?? fetch)('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.EMAIL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.ESTIMATE_FROM_EMAIL?.trim(), to: [env.ESTIMATE_TO_EMAIL?.trim()], reply_to: input.email, subject: `Estimate request — ${config.name}`, text }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!result.ok) return json(502, { message: 'The email service could not accept your request. It has not been confirmed sent. Please try again later or use a listed contact option.' });
    const receipt: unknown = await result.json();
    if (!receipt || typeof receipt !== 'object' || !('id' in receipt) || typeof receipt.id !== 'string' || !receipt.id) {
      return json(502, { message: 'We could not confirm that your request was accepted. Please try again later or use a listed contact option.' });
    }
    return json(200, { message: 'Your estimate request was accepted by the email service. Please keep an eye on your preferred contact method for a reply.' });
  } catch {
    return json(502, { message: 'We could not confirm that your request was sent. Please try again later or use a listed contact option.' });
  }
}
