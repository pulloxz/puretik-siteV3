import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "../globals.css";
import { dirOf, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const latin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
});

// The share image shown when the link is posted on social apps and chats.
const OG_IMAGE = {
  url: "/og/og-image.png",
  width: 1200,
  height: 630,
  alt: "PureTik — Creative Solutions",
};

const KEYWORDS = {
  ar: [
    "بيورتك",
    "شركة برمجة في العراق",
    "تطوير مواقع",
    "تطوير تطبيقات الهاتف",
    "متاجر إلكترونية",
    "أنظمة مخصصة",
    "الأمن السيبراني",
    "تحليل البيانات",
  ],
  en: [
    "PureTik",
    "software company Iraq",
    "web development Iraq",
    "mobile app development",
    "e-commerce",
    "custom software",
    "cybersecurity",
    "data analytics",
  ],
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    applicationName: COMPANY.name,
    keywords: [...KEYWORDS[locale]],
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", "x-default": "/ar" },
    },
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: locale === "ar" ? "ar_IQ" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_IQ"],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${arabic.variable} ${latin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <Preloader />
          <Navbar locale={locale} dict={dict} />
          {children}
          <Footer locale={locale} dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
