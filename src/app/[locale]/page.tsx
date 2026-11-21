import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { ContactSection } from "@/components/ContactSection";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero dict={dict} />
      <Marquee dict={dict} />
      <Stats dict={dict} />
      <Services dict={dict} />
      <Process dict={dict} />
      <Projects dict={dict} />
      <ContactSection dict={dict} />
    </main>
  );
}
