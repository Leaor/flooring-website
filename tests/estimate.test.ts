import assert from 'node:assert/strict';
import test from 'node:test';
import { handleEstimate } from '../packages/site/src/estimate';
import { getBusinessSettings } from '../packages/site/src/business';
import type { SiteConfig } from '../packages/site/src/types';

const now = 1_800_000_000_000;
const config = {
  id: 'humber', name: 'Humber Flooring Etobicoke', shortName: 'Humber Flooring',
  services: [{ slug: 'hardwood', title: 'Hardwood installation' }],
} as SiteConfig;
const valid = {
  name: 'Test Homeowner', phone: '416-555-0100', email: 'homeowner@example.com',
  city: 'Etobicoke', projectType: 'hardwood', squareFootage: '450',
  details: 'Replace the floor in two upstairs rooms.', preferredContact: 'email',
  consent: true, website: '', startedAt: now - 10_000,
};
const configured = { SITE_URL: 'https://flooring.example', EMAIL_API_KEY: 'test-key', ESTIMATE_FROM_EMAIL: 'forms@example.com', ESTIMATE_TO_EMAIL: 'owner@example.com' };
const dependencies = { env: configured, now: () => now, rateLimit: () => true };
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request('https://flooring.example/api/estimate', { method: 'POST', headers: { origin: 'https://flooring.example', 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
const forbiddenFetch = async () => { assert.fail('The provider must not be contacted for this request.'); };

test('rejects malformed JSON without contacting delivery', async () => {
  const response = await handleEstimate(request('{bad'), config, { ...dependencies, fetch: forbiddenFetch });
  assert.equal(response.status, 400);
});
test('returns actionable field validation errors', async () => {
  const response = await handleEstimate(request({ ...valid, email: 'not-an-email', consent: false, projectType: 'unknown', squareFootage: '-4' }), config, { ...dependencies, fetch: forbiddenFetch });
  const result = await response.json();
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys(result.errors).sort(), ['consent', 'email', 'projectType', 'squareFootage']);
});
test('returns an honest unavailable response without provider configuration', async () => {
  const response = await handleEstimate(request(), config, { ...dependencies, env: {}, fetch: forbiddenFetch });
  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /has not been sent/);
});
test('rejects cross-origin requests', async () => {
  const response = await handleEstimate(request(valid, { origin: 'https://other.example' }), config, { ...dependencies, fetch: forbiddenFetch });
  assert.equal(response.status, 403);
});
test('rejects requests without an origin', async () => {
  const req = request(); req.headers.delete('origin');
  assert.equal((await handleEstimate(req, config, { ...dependencies, fetch: forbiddenFetch })).status, 403);
});
test('uses the incoming host when Next exposes its local bind address', async () => {
  const makeRequest = (origin: string, host = '127.0.0.1:3000') => new Request('http://0.0.0.0:3000/api/estimate', {
    method: 'POST', headers: { host, origin, 'content-type': 'application/json' }, body: JSON.stringify(valid),
  });
  const options = { ...dependencies, env: {}, fetch: forbiddenFetch };
  assert.equal((await handleEstimate(makeRequest('http://127.0.0.1:3000'), config, options)).status, 503);
  assert.equal((await handleEstimate(makeRequest('https://other.example'), config, options)).status, 403);
  assert.equal((await handleEstimate(makeRequest('http://127.0.0.1:3000', '127.0.0.1:3000/forged'), config, options)).status, 403);
  // A configured canonical origin remains authoritative, even if Host matches a different Origin.
  assert.equal((await handleEstimate(makeRequest('http://127.0.0.1:3000'), config, { ...dependencies, fetch: forbiddenFetch })).status, 403);
});
test('rejects unsupported content types and oversized bodies', async () => {
  assert.equal((await handleEstimate(request(valid, { 'content-type': 'text/plain' }), config, { ...dependencies, fetch: forbiddenFetch })).status, 415);
  assert.equal((await handleEstimate(request({ ...valid, details: 'a'.repeat(17_000) }), config, { ...dependencies, fetch: forbiddenFetch })).status, 413);
});
test('rejects honeypot, too-fast, expired and non-finite timestamps', async () => {
  for (const patch of [{ website: 'https://spam.example' }, { startedAt: now - 10 }, { startedAt: now - 3 * 60 * 60 * 1000 }, { startedAt: 'not-time' }]) {
    assert.equal((await handleEstimate(request({ ...valid, ...patch }), config, { ...dependencies, fetch: forbiddenFetch })).status, 400);
  }
});
test('enforces rate limiting before provider delivery', async () => {
  const response = await handleEstimate(request(), config, { ...dependencies, rateLimit: () => false, fetch: forbiddenFetch });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '900');
});
test('the default limiter allows five attempts and resets after its window', async () => {
  const headers = { 'x-forwarded-for': '192.0.2.25' };
  const options = { env: {}, now: () => now, fetch: forbiddenFetch };
  for (let attempt = 0; attempt < 5; attempt++) {
    assert.equal((await handleEstimate(request(valid, headers), config, options)).status, 503);
  }
  assert.equal((await handleEstimate(request(valid, headers), config, options)).status, 429);
  assert.equal((await handleEstimate(request(valid, headers), config, { ...options, now: () => now + 15 * 60 * 1000 })).status, 503);
});
test('provider failures never produce success', async () => {
  for (const deliver of [async () => Response.json({ message: 'failure' }, { status: 500 }), async () => { throw new Error('network'); }, async () => Response.json({})]) {
    const response = await handleEstimate(request(), config, { ...dependencies, fetch: deliver });
    assert.equal(response.status, 502);
  }
});
test('sends validated plain text and confirms success only with a provider receipt', async () => {
  let calls = 0;
  const response = await handleEstimate(request(), config, {
    ...dependencies,
    fetch: async (url, options) => {
      calls++;
      assert.equal(url, 'https://api.resend.com/emails');
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.reply_to, valid.email);
      assert.deepEqual(payload.to, ['owner@example.com']);
      assert.equal(payload.from, 'forms@example.com');
      assert.match(payload.text, /Hardwood installation/);
      assert.match(payload.text, /Not marketing consent/i);
      assert.equal(payload.html, undefined);
      return Response.json({ id: 'provider-receipt-123' });
    },
  });
  assert.equal(calls, 1);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.match((await response.json()).message, /accepted by the email service/);
});
test('accepts a homeowner who has not chosen a flooring type yet', async () => {
  const response = await handleEstimate(request({ ...valid, projectType: 'not-sure' }), config, {
    ...dependencies,
    fetch: async (_url, options) => {
      const payload = JSON.parse(String(options?.body));
      assert.match(payload.text, /Project: Not sure yet/);
      return Response.json({ id: 'provider-receipt-unsure' });
    },
  });
  assert.equal(response.status, 200);
});
test('business metadata stays unset until valid owner configuration is provided', () => {
  assert.deepEqual(getBusinessSettings({}), { siteUrl: undefined, phone: undefined, email: undefined, address: undefined, published: false, deliveryAvailable: false });
  const configuredSettings = getBusinessSettings({ ...configured, SITE_PUBLISHED: 'true', BUSINESS_ADDRESS: 'Owner-supplied address', BUSINESS_ADDRESS_VERIFIED: 'true' });
  assert.equal(configuredSettings.published, true);
  assert.equal(configuredSettings.deliveryAvailable, true);
  assert.equal(configuredSettings.address, 'Owner-supplied address');
  assert.equal(getBusinessSettings({ BUSINESS_ADDRESS: 'Unverified address' }).address, undefined);
  assert.equal(getBusinessSettings({ SITE_URL: 'https://user:password@example.com', SITE_PUBLISHED: 'true' }).siteUrl, undefined);
  assert.equal(getBusinessSettings({ SITE_URL: 'http://localhost:3000', SITE_PUBLISHED: 'true' }).published, false);
  assert.equal(getBusinessSettings({ BUSINESS_PHONE: '-------' }).phone, undefined);
});
