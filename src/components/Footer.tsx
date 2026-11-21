import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { COMPANY } from "@/lib/company";
import { Logo } from "./Logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const company = [
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}#process`, label: dict.nav.process },
    { href: `/${locale}#projects`, label: dict.nav.projects },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {dict.footer.tagline}
          </p>
          <p className="mt-5 text-sm text-muted">
            <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">
              {COMPANY.email}
            </a>
            <br />
            <a
              href={`tel:${COMPANY.phone}`}
              dir="ltr"
              className="inline-block hover:text-accent"
            >
              {COMPANY.phoneDisplay}
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">
            {dict.footer.servicesTitle}
          </h3>
          <ul className="space-y-2.5 text-sm text-muted">
            {dict.services.items.map((s) => (
              <li key={s.key}>
                <a href={`/${locale}#services`} className="hover:text-fg">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">
            {dict.footer.companyTitle}
          </h3>
          <ul className="space-y-2.5 text-sm text-muted">
            {company.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:px-6">
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
