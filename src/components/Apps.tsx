import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getAppMeta } from "@/data/apps";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AppleLogo, PlayLogo } from "./StoreButtons";

const STORE_LINK =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black px-3.5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-accent [&_svg]:h-5 [&_svg]:w-5";

// Our mobile apps, grouped by kind. Each app is one compact row with small
// store icons, so the section stays short and shows the real number of apps.
export function Apps({ dict }: { dict: Dictionary }) {
  const { apps, projects } = dict;
  const bySlug = new Map(apps.items.map((item) => [item.slug, item]));

  return (
    <section
      id="apps"
      className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-28"
    >
      <SectionHeading eyebrow={apps.eyebrow} title={apps.title} />
      <div className="space-y-12">
        {apps.groups.map((group) => (
          <Reveal key={group.title}>
            <h3 className="mb-4 flex items-center gap-4 text-sm font-medium text-muted">
              {group.title}
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </h3>
            <ul className="flex flex-wrap justify-center gap-5">
              {group.slugs.map((slug) => {
                const item = bySlug.get(slug);
                if (!item) return null;
                const meta = getAppMeta(slug);
                return (
                  <li
                    key={slug}
                    className="flex w-full flex-col rounded-3xl border border-border bg-bg-elevated p-6 transition-colors duration-300 hover:border-accent/50 md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                  >
                    <Image
                      src={meta.icon}
                      alt=""
                      width={80}
                      height={80}
                      className="h-20 w-20 shrink-0 rounded-[22%]"
                    />
                    <div className="mt-5 flex min-w-0 flex-1 flex-col">
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="mt-1.5 flex-1 text-base leading-relaxed text-muted">
                        {item.description}
                      </p>
                      <div dir="ltr" className="mt-4 flex flex-wrap gap-2">
                        {meta.apple && (
                          <a
                            href={meta.apple}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.name} — ${projects.getItOn} App Store`}
                            className={STORE_LINK}
                          >
                            <AppleLogo />
                            App Store
                          </a>
                        )}
                        {meta.google && (
                          <a
                            href={meta.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.name} — ${projects.getItOn} Google Play`}
                            className={STORE_LINK}
                          >
                            <PlayLogo />
                            Google Play
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
