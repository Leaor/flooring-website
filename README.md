# Four GTA flooring websites

Four independently deployable Next.js applications, with distinct homepages, brand styling, copy, and supplied logos. Shared TypeScript utilities handle navigation, supporting pages, metadata, and estimate requests. Styling uses Tailwind CSS and each brand’s own CSS tokens.

The repository was empty when implementation began. There is no existing customer database or external service to migrate.

| Website | App / workspace | Development port | Design and focus |
| --- | --- | --- | --- |
| Humber Flooring Etobicoke | `apps/humber` / `@flooring/humber` | 3000 | Forest green, ivory, classic editorial typography; broad residential flooring options |
| Kingsway Oak Flooring | `apps/kingsway` / `@flooring/kingsway` | 3001 | Bright architectural composition, black and white, natural oak; hardwood and engineered wood |
| True Grain Flooring | `apps/true-grain` / `@flooring/true-grain` | 3002 | Charcoal, wood-gold, structured sans-serif design; hardwood, laminate, and vinyl |
| Montgomery Vinyl Flooring & Restoration | `apps/montgomery` / `@flooring/montgomery` | 3003 | Heritage green, gold, and ivory; vinyl, restoration, and repair assessment |

Services are explicitly presented as proposals until the owner confirms them. No reviews, company histories, accreditations, phone numbers, addresses, or completed projects have been invented.

## Run locally

Node.js 24.22.1 and npm 11.9.0 were used during implementation. The package engine requires Node.js 22 or newer; Node 24 is recommended for matching the verified environment.

From the repository root:

```sh
npm ci
npm run dev
```

The root command starts all four development servers on ports 3000–3003. Stop them together with Ctrl+C. Each cloud task already has an isolated checkout; use this checkout without creating another Git worktree unless explicitly requested.

Run one application independently:

```sh
npm run dev -w @flooring/humber
npm run build -w @flooring/humber
npm run start -w @flooring/humber
```

Replace `humber` with `kingsway`, `true-grain`, or `montgomery`. Workspace start commands use the same fixed ports as development. They require that workspace’s completed build and the full checkout/dependency installation. The application configuration also produces standalone output; use the standalone deployment instructions for a portable production artifact.

## Pages and code

Every site includes `/`, `/about`, `/services`, `/projects`, `/service-areas`, `/faq`, `/contact`, and `/privacy`. Individual service routes live at `/services/<slug>` and are generated from that site’s `services` array. The form posts to `/api/estimate`; `/sitemap.xml` and `/robots.txt` are generated from the publication settings.

| Location | What to edit |
| --- | --- |
| `apps/<brand>/site.config.ts` | Typed business copy, proposed services, service slugs, FAQs, service areas, gallery descriptions, and SEO text |
| `apps/<brand>/home.tsx` | That brand’s individual homepage layout |
| `apps/<brand>/brand.css` | Brand design tokens, layout details, and responsive styling |
| `apps/<brand>/public/brand/` | Browser-compatible supplied logo |
| `apps/<brand>/public/images/` | Replaceable local interior images |
| `apps/<brand>/app/` | Independent Next.js application entry points, routes, API, and metadata endpoints |
| `packages/site/src/` | Shared technical components, supporting-page renderer, typed brand-specific page introductions in `page-copy.ts`, business settings, and estimate delivery |
| `tests/` | Estimate-system unit tests and browser checks |
| `docs/ASSETS.md` | Logo mapping, image provenance, and replacement requirements |

Each site has separate settings. Copy its example only when configuring it:

```sh
cp apps/humber/.env.example apps/humber/.env.local
```

`.env.local` is ignored by Git. Enter actual credentials through secure hosting environment settings for deployment; do not commit them or put them in documentation. Restart the relevant server after changing environment settings.

| Setting | Purpose |
| --- | --- |
| `SITE_URL` | The exact canonical origin, with scheme, once the real domain is supplied |
| `SITE_PUBLISHED` | Keep `false` until owner review; `true` with a public HTTPS domain enables indexing and sitemap entries |
| `BUSINESS_PHONE` | Actual public business telephone number; enables tap-to-call links |
| `BUSINESS_EMAIL` | Actual public contact email; separate from the private form recipient |
| `BUSINESS_ADDRESS` | Actual owner-confirmed public business address, if one should be shown in structured data |
| `BUSINESS_ADDRESS_VERIFIED` | Must be `true` before an address is used |
| `EMAIL_API_KEY` | Resend API key, kept server-side |
| `ESTIMATE_TO_EMAIL` | Real receiving mailbox for this company |
| `ESTIMATE_FROM_EMAIL` | Plain sender email on a domain verified in Resend |

Leave `SITE_URL` unset during local development, or set it to that instance’s actual origin. A production domain copied into a local or preview environment will cause origin validation to reject form submissions.

## Estimate requests

The accessible form includes contact details, area, project type, optional square footage, project details, preferred contact method, and consent. “Not sure yet” is a valid project type. The server revalidates all fields, restricts payload size, checks the request origin, applies spam checks and rate limits, and sends plain-text email through Resend.

If delivery settings are missing, the form clearly says online requests are unavailable and its submit button is disabled. A valid direct API request returns `503`. The interface reports success only after the provider returns an acceptance receipt; acceptance is not a guarantee of inbox delivery. Live email delivery has not been tested with real credentials.

There is no application customer database and no browser storage of enquiry fields. Email service and recipient-mailbox retention still apply. See [deployment instructions](docs/DEPLOYMENT.md) for delivery setup, production rate limiting, and privacy requirements.

## Assets and launch content

All four supplied HEIC logos are integrated as browser-compatible JPEGs. The originals remain in `docs/brand-originals/`.

The requested stock-photo download was blocked by the environment’s network policy. Interior images are therefore clearly labelled **AI-generated interior concepts**, not licensed stock photography, actual products, or completed installations. Each brand has two unique generated images; `room.jpg` repeats its hero. This is a documented limitation relative to the requested real photography. Replace these concepts with properly licensed photography or permissioned real project images before a launch that requires real photographs. [Asset records](docs/ASSETS.md) include source provenance and replacement guidance.

Before public launch, the owner must provide actual domains and contact details, configure delivery, confirm service availability and areas, review the privacy policy and retention practices, and approve all content. Real project photographs and verified project details are required before presenting a portfolio. Set each confirmed service’s `verified` flag to `true` only after that review. Development works while these settings remain unset.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

With the four servers running, execute browser checks in another terminal:

```sh
npm run test:browser
```

Browser checks use Chromium at `/usr/bin/chromium` in this cloud environment. Set `CHROMIUM_PATH` to another installed Chromium executable when running elsewhere. Tests cover navigation, responsive layouts, accessibility, the unavailable form state, and a configured form’s validation/loading/error/retry/success states using intercepted responses. They do not send real customer enquiries. The configured fixture uses port 3104 and explicit test-only values; leave that port free.

### Verification record

These results were observed in the prepared cloud environment. Production builds were packaged and started separately for all four brands; no public deployment or live email delivery is claimed.

| Check | Current evidence |
| --- | --- |
| Estimate API and business-settings unit tests | 14 passed, 0 failed; includes provider success/failure mocks, “not sure yet,” validation, unavailable delivery, spam, and actual limiter expiry |
| TypeScript | Passed for all four apps; production builds also completed their TypeScript checks |
| Lint | Passed across apps, shared packages, tests, and scripts with no errors or warnings |
| Four production builds | All four passed; changed brands rebuilt after final visual fixes |
| Desktop, tablet, and mobile browser checks | 29 passed; 15 targeted rechecks passed after final fixes. No failures, skipped, or flaky tests. Sizes: 1440×1000, 768×1024, 390×844 |
| Accessibility | Eight automated WCAG scans passed on each homepage and contact page; keyboard menu, skip link, focus, and FAQ checks passed |
| Standalone package startup | All four independent packages served their pages and local assets successfully; packages contain no environment files or escaping symlinks |
| Reusable installation | Frozen-lockfile npm ci completed successfully (381 packages); lint and 14 unit tests passed afterward |
| Saved development startup | Restarted all four apps with npm run dev after reinstall; all homepages and contact pages returned HTTP 200 with correct content |
| Real email delivery | Not run; owner credentials and verified sender required |

See [deployment instructions](docs/DEPLOYMENT.md) for four-project hosting and portable Node deployments. The implementation plan is recorded in [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md).

Full browser results: `test-results/results.json`; final targeted results: `test-results/targeted-results.json`. Twenty-four homepage screenshots (viewport and full-page, three widths per brand) are retained under `test-results/`. These generated outputs are ignored by Git and can be reproduced with the browser suite.

The cloud configuration draft includes tested installation/start instructions, the checkout location, and proposed network additions for `images.unsplash.com`, `unsplash.com`, and `api.resend.com`. Saving the draft does not apply or publish it. Review and save the environment settings, then publish the prepared environment to retain it for future tasks. Fresh-task restoration has not been tested. The repository began empty; this implementation supplies its initial application source.
