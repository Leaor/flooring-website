export type BusinessSettings = {
  siteUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  published: boolean;
  deliveryAvailable: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return value.length <= 254 && emailPattern.test(value) && !/[\r\n]/.test(value);
}

export function getBusinessSettings(env: NodeJS.ProcessEnv = process.env): BusinessSettings {
  let siteUrl: string | undefined;
  try {
    const url = new URL(env.SITE_URL || '');
    if (['http:', 'https:'].includes(url.protocol) && !url.username && !url.password) {
      siteUrl = url.origin;
    }
  } catch { /* An unset or invalid owner-supplied domain must not become a canonical URL. */ }

  const phoneValue = env.BUSINESS_PHONE?.trim();
  const phone = phoneValue && /^[+\d().\s-]{7,30}$/.test(phoneValue) && phoneValue.replace(/\D/g, '').length >= 7 ? phoneValue : undefined;
  const emailValue = env.BUSINESS_EMAIL?.trim();
  const email = emailValue && isEmail(emailValue) ? emailValue : undefined;
  const address = env.BUSINESS_ADDRESS_VERIFIED === 'true' ? env.BUSINESS_ADDRESS?.trim() || undefined : undefined;
  const publicDomain = siteUrl && new URL(siteUrl).protocol === 'https:' && !/^(localhost|127\.|0\.|\[::1\])/.test(new URL(siteUrl).hostname);

  return {
    siteUrl,
    phone,
    email,
    address,
    published: Boolean(publicDomain && env.SITE_PUBLISHED === 'true'),
    deliveryAvailable: Boolean(
      env.EMAIL_API_KEY?.trim() &&
      isEmail(env.ESTIMATE_TO_EMAIL?.trim() || '') &&
      isEmail(env.ESTIMATE_FROM_EMAIL?.trim() || ''),
    ),
  };
}
