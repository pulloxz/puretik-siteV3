// Public address of the site. Set NEXT_PUBLIC_SITE_URL on the host (for
// example in Vercel) to the real domain; the fallback is the company's
// current domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretik.com"
).replace(/\/$/, "");
