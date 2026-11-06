import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const sites = [
  { slug: 'humber', port: 3000, name: 'Humber Flooring Etobicoke' },
  { slug: 'kingsway', port: 3001, name: 'Kingsway Oak Flooring' },
  { slug: 'true-grain', port: 3002, name: 'True Grain Flooring' },
  { slug: 'montgomery', port: 3003, name: 'Montgomery Vinyl Flooring & Restoration' },
];
const sizes = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

async function noHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function visibleImagesLoaded(page: Page) {
  await expect.poll(async () => page.locator('img').evaluateAll(images => images
    .filter(image => image.getBoundingClientRect().top < window.innerHeight && image.getBoundingClientRect().bottom > 0)
    .every(image => image.complete && image.naturalWidth > 0))).toBe(true);
}

for (const site of sites) {
  const origin = `http://127.0.0.1:${site.port}`;
  test.describe(site.slug, () => {
    for (const size of sizes) {
      test(`homepage at ${size.name}`, async ({ page }, testInfo) => {
        await page.setViewportSize(size);
        const exceptions: string[] = [];
        page.on('pageerror', error => exceptions.push(error.message));
        const response = await page.goto(origin, { waitUntil: 'networkidle' });
        expect(response?.status()).toBe(200);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('.brand-logo')).toHaveAttribute('alt', site.name);
        await expect(page.locator('main a[href="/contact"]').first()).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
        await visibleImagesLoaded(page);
        await noHorizontalOverflow(page);
        for (const image of await page.locator('main img').all()) {
          if (await image.isVisible()) {
            await image.scrollIntoViewIfNeeded();
            await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
          }
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: testInfo.outputPath(`${site.slug}-${size.name}-viewport.png`) });
        await page.screenshot({ path: testInfo.outputPath(`${site.slug}-${size.name}.png`), fullPage: true });
        if (size.name !== 'desktop') {
          const menu = page.locator('.menu-button');
          await expect(menu).toBeVisible();
          await menu.focus();
          await page.keyboard.press('Enter');
          await expect(menu).toHaveAttribute('aria-expanded', 'true');
          await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(menu).toHaveAttribute('aria-expanded', 'false');
          await expect(menu).toBeFocused();
          await menu.click();
          await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Flooring services', exact: true }).click();
          await expect(page).toHaveURL(`${origin}/services`);
          await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
          await noHorizontalOverflow(page);
        }
        expect(exceptions).toEqual([]);
      });
    }

    test('internal routes, assets, SEO boundaries and not-found behavior', async ({ page, request }) => {
      await page.goto(origin, { waitUntil: 'networkidle' });
      const links = await page.locator('a[href]').evaluateAll(anchors => [...new Set(anchors
        .map(anchor => anchor.getAttribute('href') || '')
        .filter(href => href.startsWith('/') && !href.startsWith('//')))]);
      expect(links).toEqual(expect.arrayContaining(['/about', '/services', '/projects', '/service-areas', '/faq', '/contact', '/privacy']));
      expect(links.filter(link => link.startsWith('/services/')).length).toBeGreaterThanOrEqual(3);
      const titles = new Set<string>();
      const descriptions = new Set<string>();
      for (const link of links) {
        const response = await request.get(`${origin}${link}`);
        expect(response.status(), link).toBe(200);
        const html = await response.text();
        expect(html, link).toContain('<h1');
        expect(html, link).not.toContain('Internal Server Error');
        const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
        const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
        expect(title, `${link} title`).toBeTruthy();
        expect(description, `${link} description`).toBeTruthy();
        expect(titles.has(title!), `${link} must have a distinct title`).toBe(false);
        expect(descriptions.has(description!), `${link} must have a distinct description`).toBe(false);
        titles.add(title!);
        descriptions.add(description!);
      }
      for (const asset of ['/brand/logo.jpg', '/images/hero.jpg', '/images/room.jpg', '/images/detail.jpg']) {
        const response = await request.get(origin + asset);
        expect(response.status(), asset).toBe(200);
        expect(response.headers()['content-type'], asset).toMatch(/^image\//);
      }
      const robots = await request.get(origin + '/robots.txt');
      expect(robots.status()).toBe(200);
      expect(await robots.text()).toContain('Disallow: /');
      const sitemap = await request.get(origin + '/sitemap.xml');
      expect(sitemap.status()).toBe(200);
      expect(await sitemap.text()).not.toContain('<loc>');
      const response = await page.goto(origin + '/this-page-does-not-exist');
      // Next.js can return 200 for a streamed notFound; the required boundary is noindex + the not-found UI.
      expect([200, 404]).toContain(response?.status());
      await expect(page.getByRole('heading', { name: 'Let’s get you back home.' })).toBeVisible();
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', /noindex/);
    });

    test('contact form is accessible and honestly unavailable without delivery settings', async ({ page, request }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(origin + '/contact', { waitUntil: 'networkidle' });
      for (const field of ['Full name', 'Phone', 'Email', 'City / area', 'Type of flooring project', 'Project details', 'Preferred contact method']) {
        await expect(page.getByLabel(field, { exact: true })).toBeVisible();
      }
      await expect(page.getByLabel(/Approximate square footage/)).toBeVisible();
      await expect(page.getByRole('checkbox')).toBeVisible();
      await expect(page.getByText('Online requests are not available yet.')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Request a Free Estimate', exact: true })).toBeDisabled();
      await expect(page.getByRole('status')).not.toContainText('Request received');
      await page.getByLabel('Full name', { exact: true }).fill('A local homeowner');
      await expect(page.getByRole('button', { name: 'Request a Free Estimate', exact: true })).toBeDisabled();
      await noHorizontalOverflow(page);
      const serviceValue = await page.locator('#projectType option').nth(1).getAttribute('value');
      const response = await request.post(origin + '/api/estimate', {
        headers: { Origin: origin },
        data: { name: 'Local Homeowner', phone: '4165550100', email: 'test@example.com', city: 'Etobicoke', projectType: serviceValue, squareFootage: '450', details: 'A test request that must not be sent.', preferredContact: 'email', consent: true, website: '', startedAt: Date.now() - 10_000 },
      });
      expect(response.status()).toBe(503);
      const result = await response.json();
      expect(result.message).toMatch(/not (yet |currently )?(available|configured)|unavailable|not been sent/i);
    });

    test('FAQ disclosure and keyboard skip link work', async ({ page }) => {
      await page.goto(origin + '/faq', { waitUntil: 'networkidle' });
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('main')).toBeFocused();
      const disclosure = page.locator('.faq-list details').first();
      const summary = disclosure.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('open', '');
      await expect(disclosure.locator('p')).toBeVisible();
    });

    test('WCAG accessibility checks on homepage and contact form', async ({ page }) => {
      for (const pathname of ['/', '/contact']) {
        await page.goto(origin + pathname, { waitUntil: 'networkidle' });
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(result.violations.map(violation => ({ id: violation.id, impact: violation.impact, description: violation.description, elements: violation.nodes.map(node => ({target:node.target,summary:node.failureSummary})) })), pathname).toEqual([]);
      }
    });
  });
}
