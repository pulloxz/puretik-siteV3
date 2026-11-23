import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "ar" ? 1 : 0.9,
    alternates: { languages },
  }));
}
