# Walter's Mobile Solutions website

The public website for Walter's Mobile Solutions, mobile RV repair in Nacogdoches, TX: <https://walterssolutions.com>

Hosted free on GitHub Pages from the `main` branch. The domain is registered at Namecheap and points here through DNS; the `CNAME` file tells GitHub which domain to serve.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole home page: services, service area, request form |
| `site.js` | Page behavior: mobile menu, fade-ins, service details, floating Call button |
| `thank-you.html` | Shown after someone submits the request form |
| `404.html` | Shown for any address that doesn't exist |
| `schedule.html`, `Services.html` | Old pages, now just send visitors to the home page |
| `Logo2.webp`, `og-image.jpg`, `favicon.*`, `apple-touch-icon.png` | Logo, link-preview image and browser icons |
| `robots.txt`, `sitemap.xml` | Help search engines find the site |

## Notes for editing

- The request form is delivered by FormSubmit (formsubmit.co) to the business inbox.
- `index.html` has a Content-Security-Policy tag. It only allows scripts from this site plus one tiny inline script, identified by its SHA-256 fingerprint. If that inline script ever changes, update the fingerprint in the policy, or the fade-in effects stop working. Sections are never left hidden: without scripts they show immediately, and if `site.js` fails to load they appear after 2.5 seconds.
- The site as it was before the November 2026 cleanup is saved on the `original` branch.
