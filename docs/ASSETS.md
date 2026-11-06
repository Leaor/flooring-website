# Brand assets and illustration provenance

## Supplied logos

The following logo files were supplied with the project brief. Original HEIC uploads are preserved without modification in `docs/brand-originals/`.

| Website | Original upload | Browser asset |
| --- | --- | --- |
| Humber Flooring Etobicoke | `brand-originals/IMG_6497.heic` | `apps/humber/public/brand/logo.jpg` |
| Kingsway Oak Flooring | `brand-originals/IMG_6500.heic` | `apps/kingsway/public/brand/logo.jpg` |
| True Grain Flooring | `brand-originals/IMG_6548.heic` | `apps/true-grain/public/brand/logo.jpg` |
| Montgomery Vinyl Flooring & Restoration | `brand-originals/IMG_6490.heic` | `apps/montgomery/public/brand/logo.jpg` |

Browser files are format conversions of the supplied images, not redesigned logos. The business owner should confirm ownership or permission to publish the supplied marks before launch. No third-party logo license has been inferred.

## Interior imagery

The eight distinct interior and material images were created for this project using OpenAI's image-generation tool. They are **AI-generated interior concepts**, not stock photography, actual homes, named product samples, or completed work by any of the four businesses. No external photographer or stock license is being claimed.

Use the visible label **“AI-generated interior concept. Not a completed project.”** beside these images. Use accurate scene descriptions in alt text, including “AI-generated concept” where the context does not otherwise make the provenance clear. A rendered wood texture does not establish a material's composition or product performance.

| Website | `hero.jpg` and `room.jpg` | `detail.jpg` |
| --- | --- | --- |
| Humber | Warm traditional sitting room, ivory built-ins, forest-green chair and natural oak floor | Oak-floor entryway concept with ivory trim and a green chair |
| Kingsway | Bright architectural living and dining room with pale oak floor | Pale oak herringbone pattern beside an ivory chair |
| True Grain | Charcoal contemporary living room with golden oak floor | Golden oak-plank material concept with dark skirting and sunlight |
| Montgomery | Heritage sitting room and hallway, sage walls, ivory panelling and oak-look floor | Oak-look plank concept beside ivory panelling and a sage door |

Each application stores its images in `apps/<brand>/public/images/`. `room.jpg` is intentionally a byte-for-byte copy of that brand's `hero.jpg`, so these two filenames must not be represented as separate projects or independent photographs. Each brand has two unique generated images.

Original PNGs are preserved in `docs/illustration-originals/`; the tool's originals also remain in `/workspace/generated_images/`. Source filenames, SHA-256 hashes, dimensions and conversion records are in `docs/illustration-provenance.json`. All images are 1536 × 1024. Browser copies are progressive JPEGs at quality 88, approximately 270–350 KB each; conversion does not crop, composite or change image content.

Replace concepts with owner-approved project photographs when available. Verify that the owner has permission to publish each photograph, and accurately describe the work shown. The gallery currently demonstrates visual presentation, not business credentials.

Before adding a new photograph, record its author, original source URL, download date, license URL and any modifications here. Do not assume that a public repository or freely downloadable image grants commercial reuse permission.

The initial environment denied requests to `images.unsplash.com`. No blocked source was accessed through a mirror or proxy, and no unverified stock-photo license has been claimed.
