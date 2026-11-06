import { test, expect } from '@playwright/test';
import { spawn, type ChildProcess } from 'node:child_process';
import path from 'node:path';

// Uses only explicitly fake fixture values. Every submission is intercepted in the
// browser; no request reaches the app's email handler or a delivery provider.
const origin = 'http://127.0.0.1:3104';
let server: ChildProcess;
let output = '';

test.beforeAll(async () => {
  server = spawn(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '3104'], {
    cwd: path.resolve('apps/humber'),
    env: {
      ...process.env,
      NODE_ENV: 'production',
      SITE_URL: origin,
      SITE_PUBLISHED: 'false',
      BUSINESS_PHONE: '4165550100',
      EMAIL_API_KEY: 'test-fixture-not-a-credential',
      ESTIMATE_TO_EMAIL: 'recipient@example.com',
      ESTIMATE_FROM_EMAIL: 'sender@example.com',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout?.on('data', data => { output += String(data); });
  server.stderr?.on('data', data => { output += String(data); });
  await expect.poll(async () => {
    if (server.exitCode !== null) throw new Error(`Configured form fixture stopped: ${output}`);
    try { return (await fetch(origin + '/contact')).status; } catch { return 0; }
  }, { timeout: 30_000 }).toBe(200);
});

test.afterAll(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill('SIGTERM');
  await new Promise<void>(resolve => server.once('exit', () => resolve()));
});

test('configured form validates, shows loading and errors, and confirms only accepted delivery', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let release: ((result: { status: number; message: string }) => void) | undefined;
  const payloads: Record<string, unknown>[] = [];
  await page.route('**/api/estimate', async route => {
    payloads.push(route.request().postDataJSON());
    const result = await new Promise<{status:number;message:string}>(resolve => { release = resolve; });
    await route.fulfill({ status: result.status, contentType: 'application/json', body: JSON.stringify({ message: result.message }) });
  });
  await page.goto(origin + '/contact', { waitUntil: 'networkidle' });
  await expect(page.locator('.top-bar a[href="tel:4165550100"]')).toBeVisible();
  const submit = page.getByRole('button', { name: 'Request a Free Estimate', exact: true });
  await expect(submit).toBeEnabled();
  await submit.click();
  expect(payloads).toHaveLength(0);
  expect(await page.getByLabel('Full name', { exact: true }).evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(true);

  await page.getByLabel('Full name', { exact: true }).fill('Test Homeowner');
  await page.getByLabel('Phone', { exact: true }).fill('4165550100');
  await page.getByLabel('Email', { exact: true }).fill('homeowner@example.com');
  await page.getByLabel('City / area', { exact: true }).fill('Etobicoke');
  await page.getByLabel('Type of flooring project', { exact: true }).selectOption('not-sure');
  await page.getByLabel(/Approximate square footage/).fill('450');
  await page.getByLabel('Project details', { exact: true }).fill('A fictional test enquiry for an existing living room floor.');
  await page.getByLabel('Preferred contact method', { exact: true }).selectOption('phone');
  await page.getByRole('checkbox').check();
  await submit.click();
  await expect(page.getByRole('button', { name: 'Sending your request…' })).toBeDisabled();
  await expect.poll(() => payloads.length).toBe(1);
  expect(payloads[0]).toMatchObject({ name: 'Test Homeowner', projectType: 'not-sure', preferredContact: 'phone', consent: true });
  release?.({status:502,message:'The email service could not accept your request. It has not been confirmed sent.'});
  await expect(page.locator('.form-result[role="alert"]')).toContainText('not been confirmed sent');
  await expect(page.getByText('Request received by the email service', { exact: true })).toHaveCount(0);
  await expect(submit).toBeEnabled();

  await submit.click();
  await expect.poll(() => payloads.length).toBe(2);
  release?.({status:200,message:'Your estimate request was accepted by the email service.'});
  await expect(page.getByRole('status')).toContainText('Request received by the email service');
  await expect(page.locator('form')).toHaveCount(0);
});
