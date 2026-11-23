import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { appMeta } from "@/data/apps";
import { COMPANY } from "./company";
import { SITE_URL } from "./site";

// schema.org data (JSON-LD) that tells search engines and AI assistants who
// the company is, what it does and which products it has.
export function buildStructuredData(locale: Locale) {
  const dict = getDictionary(locale);
  const orgId = `${SITE_URL}/#organization`;

  const organization = {
    "@type": "Organization",
    "@id": orgId,
    name: COMPANY.name,
    alternateName: "بيورتك",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-full.png`,
    description: dict.meta.description,
    foundingDate: String(COMPANY.founded),
    email: COMPANY.email,
    telephone: [COMPANY.phone, COMPANY.phone2],
    address: {
      "@type": "PostalAddress",
      streetAddress: dict.contact.address,
      addressLocality: locale === "ar" ? "بغداد" : "Baghdad",
      addressCountry: "IQ",
    },
    areaServed: { "@type": "Country", name: "Iraq" },
    knowsAbout: dict.services.items.map((s) => s.title),
    sameAs: Object.values(COMPANY.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      availableLanguage: ["Arabic", "English"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: COMPANY.name,
    inLanguage: locale,
    publisher: { "@id": orgId },
  };

  const apps = dict.apps.items.map((item) => {
    const meta = appMeta[item.slug as keyof typeof appMeta] as {
      icon: string;
      apple?: string;
      google?: string;
    };
    return {
      "@type": "MobileApplication",
      name: item.name,
      description: item.description,
      image: `${SITE_URL}${meta.icon}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: [meta.apple && "iOS", meta.google && "Android"]
        .filter(Boolean)
        .join(", "),
      installUrl: [meta.apple, meta.google].filter(Boolean),
      author: { "@id": orgId },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...apps],
  };
}
