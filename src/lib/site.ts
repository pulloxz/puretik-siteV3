// Public address of the site, used for the share image, canonical links, the
// sitemap and structured data. In order of preference:
// 1. NEXT_PUBLIC_SITE_URL, if it is set;
// 2. the production domain Vercel gives the project (set automatically there);
// 3. the company's current domain.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercel ? `https://${vercel}` : "https://www.puretik.com")
).replace(/\/$/, "");
