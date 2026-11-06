# Deploying the four websites

Deploy each application as a separate site with its own domain, runtime settings, and email recipient. They share source code and the repository lockfile, but do not require one another’s servers. Run installation from the repository root with Node.js 24 and `npm ci`.

## Prepare one site

1. Review `apps/<brand>/site.config.ts` with the owner. Confirm services and coverage, replace proposed claims where necessary, and supply real contact details.
2. Supply the application’s environment variables securely. Use its `.env.example` as the list of supported names. Never package or commit real `.env.local` files.
3. Keep `SITE_PUBLISHED=false` on staging and previews. When approved, use the real HTTPS domain for `SITE_URL`, set `SITE_PUBLISHED=true`, and redirect alternative public hostnames to that canonical domain.
4. Confirm the privacy contact, retention practices, image rights, and any genuine project details before accepting real enquiries.

When `SITE_PUBLISHED` is false or a valid public HTTPS origin is absent, pages are marked noindex, robots disallows crawling, and the sitemap has no entries. This is an indexing safeguard, not access control: use hosting authentication if a preview must be private.

## Standalone Node deployment

The Next.js configuration uses `output: 'standalone'` and traces shared dependencies from the repository root. The packaging helper includes the traced runtime, public assets, and compiled static assets. Package each app independently:

```sh
npm ci
npm run build -w @flooring/humber
node scripts/package-site.mjs humber
```

The artifact is `artifacts/humber/`, with its server at `artifacts/humber/apps/humber/server.js`. Copy the entire artifact directory to the host, preserving its relative structure. The host needs a compatible Node runtime, but does not need the source checkout or a second dependency installation for the traced runtime.

Configure the business and delivery variables in the hosting service, then start the server from the artifact directory:

```sh
HOSTNAME=0.0.0.0 PORT=3000 node apps/humber/server.js
```

Use a process supervisor/container platform that restarts the process and terminates it gracefully. Put the service behind HTTPS. Choose the host’s required port using `PORT`; separate deployments can each use port 3000. Repeat the build and package commands with `kingsway`, `true-grain`, or `montgomery` to create their independent artifacts.

The workspace `npm run start -w @flooring/humber` command runs `next start` against the full checkout and installed dependencies for a local production check. Because standalone output is configured, Next.js can emit a reminder to use the standalone server. For portable deployment, use the packaged `server.js` entry above.

After starting a deployment, check the home page, a service page, contact page, logo and interior assets, a nonexistent route, robots, and sitemap. Verify the canonical hostname and each site’s unique metadata. Do not consider an open port alone evidence that the site works.

## Vercel or another Next.js platform

Create four projects connected to the same repository:

| Project | Root directory | Workspace |
| --- | --- | --- |
| Humber | `apps/humber` | `@flooring/humber` |
| Kingsway | `apps/kingsway` | `@flooring/kingsway` |
| True Grain | `apps/true-grain` | `@flooring/true-grain` |
| Montgomery | `apps/montgomery` | `@flooring/montgomery` |

Select the Next.js framework preset. Enable inclusion of source files outside the selected Root Directory, because `packages/site/`, the root dependency installation, and the lockfile are shared. Use an installation command that runs `npm ci` at the repository root; from the app root that command is `cd ../.. && npm ci`. Build from the app root with `npm run build`. Retain the framework’s normal output detection rather than pointing it at another site’s build.

Set environment variables independently in each project. Restrict production sender/recipient settings to the appropriate deployment environment. Previews should remain noindex. Leave `SITE_URL` unset on previews, or set it to their exact origin; do not reuse a different production origin for a preview form.

Check the platform’s current workspace, build-root, and external-directory settings before deploying. Vercel publication itself has not been performed by this implementation.

## Configure real estimate delivery

The server uses Resend’s HTTPS email API at `api.resend.com`. On a network-restricted host, permit that destination through the supported outbound policy. Never disable TLS verification.

1. Verify a sender domain in Resend, including the DNS records required by that provider.
2. Create an appropriately scoped email-sending credential and store it as `EMAIL_API_KEY` in secure hosting settings.
3. Set `ESTIMATE_FROM_EMAIL` to a plain email address on that verified sender domain, and `ESTIMATE_TO_EMAIL` to the actual receiving mailbox for this company.
4. Set `BUSINESS_EMAIL` and `BUSINESS_PHONE` only if those real details should be public. They are independent of the internal delivery recipient.
5. Restart/redeploy the application and, with owner authorization, submit a clearly identified test enquiry. Confirm provider acceptance and receipt in the intended mailbox, including spam filtering. Delete the test message under the owner’s retention policy.

Without valid delivery settings, the UI disables sending and explains the limitation. The server returns `503` for a valid request. Provider rejection, network failure, or a response without a receipt returns an error rather than a false success. A successful response means the provider accepted the request; final inbox delivery can still fail.

No live email was sent during implementation. Provider behavior is covered by mocked unit tests. Configure recipient details carefully: the code cannot determine whether an otherwise valid email address belongs to the right business.

## Spam protection and hosting requirements

The API validates every field, permits only supported project choices (including “Not sure yet”), limits request bodies to 16 KiB, requires JSON and a matching Origin, checks a honeypot and form age, and limits attempts. It accepts a completed form between two seconds and two hours after the page was loaded.

The built-in limiter allows five attempts per site/requester in a fixed 15-minute window. It stores a salted requester hash, attempt count, and expiry in process memory; it does not store the raw IP address or enquiry text. Entries expire from eligibility after 15 minutes and are removed on a subsequent request. A process restart clears the map and its random salt. At most 5,000 entries are retained.

The requester identifier uses the first `x-forwarded-for` address. **The hosting edge must replace untrusted client forwarding headers with its own verified value.** Otherwise clients can forge identifiers. A host that supplies no forwarding header shares a fallback bucket across requests.

Use an edge/WAF or shared distributed rate limiter in front of multi-instance or serverless deployments. The process-local limiter does not coordinate between instances or survive restarts. Preserve Origin forwarding through your reverse proxy; the form intentionally rejects requests from a different `SITE_URL`. These controls reduce automated submissions and are not a guarantee against spam.

## Privacy and retention

Form fields are sent only to the application and configured email provider. The application does not create a customer database, write enquiry bodies to application logs, or persist form values in browser storage. Avoid adding request-body logging in hosting observability tools.

Resend and the receiving mailbox still process and may retain message data, potentially outside Canada. The owner must set a justified enquiry-retention schedule, configure provider/mailbox retention where supported, decide who can access messages, and supply a working privacy contact before launch. Deleting a browser form does not delete copies already delivered by email.

The included privacy page describes the implementation and requires owner review. Update it if analytics, a CRM, uploads, tracking, additional service providers, or a different retention policy are introduced. Do not add marketing recipients from estimate submissions without a separate appropriate basis.

## Photography and content approval

The supplied logos are integrated, with their original files preserved. The owner must confirm the right to publish those marks.

Interior imagery is currently generated illustration because stock-photo access was denied by the onboarding environment. It is labelled as such throughout the sites and is not a portfolio. Replace it with licensed photography or owner-approved project photographs if the launch requires real photography. Record attribution and license details in `docs/ASSETS.md`; update captions and alt text to match. Never convert an illustrative image into an alleged completed project by changing only its caption.

Do not publish invented contact details, business addresses, office locations, reviews, history, or service guarantees to fill empty settings. The unconfigured development state is intentional and does not prevent development or build validation.
