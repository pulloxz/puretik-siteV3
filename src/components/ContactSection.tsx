import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { COMPANY } from "@/lib/company";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";
import { Reveal } from "./Reveal";
import { InstagramIcon, LinkedinIcon } from "./SocialIcons";

export function ContactSection({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const t = dict.contact;
  // One row per contact method: an icon, a small label and the value. Every
  // row is a single link, clickable all over. `external` opens a new tab.
  const actions = [
    {
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      label: t.phoneLabel,
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phone}`,
      external: false,
      ltr: true,
      // A second way in on the same row: the same number on WhatsApp.
      whatsapp: {
        href: `https://wa.me/${COMPANY.phone.replace(/\D/g, "")}`,
        label: t.whatsappLabel,
      },
    },
    {
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: t.emailLabel,
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      external: false,
      ltr: true,
    },
    {
      icon: <InstagramIcon />,
      label: "Instagram",
      value: "@puretik.iq",
      href: COMPANY.social.instagram,
      external: true,
      ltr: true,
    },
    {
      icon: <LinkedinIcon />,
      label: "LinkedIn",
      value: "PureTik",
      href: COMPANY.social.linkedin,
      external: true,
      ltr: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border py-16 sm:py-28"
    >
      {/* Faint echo of the brand mark, bleeding off the corner. */}
      <Image
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden="true"
        width={374}
        height={640}
        className="pointer-events-none absolute -bottom-24 start-[-4rem] h-[34rem] w-auto -rotate-[7deg] opacity-[0.07]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium text-muted">
            <span
              dir="ltr"
              className="font-mono text-accent"
              aria-hidden="true"
            >
              {"//"}
            </span>
            {t.eyebrow}
          </p>
          <h2 className="mt-5 bg-gradient-to-r from-accent to-lime bg-clip-text text-5xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-7xl rtl:bg-gradient-to-l">
            {t.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>

          <ul className="mt-12">
            {actions.map(
              ({ icon, label, value, href, external, ltr, whatsapp }) => (
                <li
                  key={href}
                  className="group relative flex items-center gap-4 border-t border-border px-3 py-5 transition-colors duration-300 hover:bg-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-black group-hover:text-black">
                    {icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted transition-colors group-hover:text-black/70">
                      {label}
                    </span>
                    {/* The main link stretches over the whole row. */}
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      dir={ltr ? "ltr" : undefined}
                      className="mt-0.5 block w-fit text-start text-xl font-semibold transition-colors after:absolute after:inset-0 group-hover:text-black"
                    >
                      {value}
                    </a>
                  </span>
                  {whatsapp ? (
                    // Sits above the stretched link, so it can be pressed on its own.
                    <a
                      href={whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 shrink-0 rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
                    >
                      {whatsapp.label}
                    </a>
                  ) : (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-muted transition-colors group-hover:text-black rtl:-scale-x-100"
                    />
                  )}
                </li>
              ),
            )}
            <li className="flex items-start gap-4 border-y border-border px-3 py-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">
                  {t.addressLabel}
                </span>
                <span className="mt-0.5 block max-w-md text-balance text-lg font-semibold leading-snug">
                  {t.address}
                </span>
              </span>
            </li>
          </ul>
          <MapEmbed title={t.mapTitle} openLabel={t.openMap} lang={lang} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-bg-elevated p-6 sm:p-10">
            <h3 className="text-2xl font-bold">{t.formTitle}</h3>
            <p className="mb-8 mt-2 text-sm text-muted">{t.requiredNote}</p>
            <ContactForm dict={dict} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
