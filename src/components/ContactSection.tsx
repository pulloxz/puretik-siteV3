import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { COMPANY } from "@/lib/company";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function ContactSection({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const actions = [
    {
      icon: Phone,
      label: t.phoneLabel,
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phone}`,
      external: false,
    },
    {
      icon: Mail,
      label: t.emailLabel,
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border px-4 py-28 sm:px-6"
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

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium text-muted">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h2 className="mt-5 bg-gradient-to-r from-accent to-lime bg-clip-text text-6xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-7xl rtl:bg-gradient-to-l">
            {t.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>

          <ul className="mt-12">
            {actions.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 border-t border-border px-3 py-5 transition-colors duration-300 hover:bg-accent"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-black group-hover:text-black">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted transition-colors group-hover:text-black/70">
                      {label}
                    </span>
                    <span
                      dir="ltr"
                      className="mt-0.5 block text-start text-xl font-semibold transition-colors group-hover:text-black"
                    >
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-muted transition-colors group-hover:text-black rtl:-scale-x-100"
                  />
                </a>
              </li>
            ))}
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
