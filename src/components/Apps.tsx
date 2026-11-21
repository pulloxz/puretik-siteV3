import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getAppMeta } from "@/data/apps";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { StoreButtons } from "./StoreButtons";

// Our mobile apps, each with the store pages it is published on.
export function Apps({ dict }: { dict: Dictionary }) {
  const { apps, projects } = dict;
  return (
    <section
      id="apps"
      className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-28"
    >
      <SectionHeading eyebrow={apps.eyebrow} title={apps.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.items.map((item, i) => {
          const meta = getAppMeta(item.slug);
          return (
            <Reveal key={item.slug} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-6 transition-colors duration-300 hover:border-accent/50">
                <Image
                  src={meta.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-[22%]"
                />
                <h3 className="mt-5 text-xl font-bold">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <StoreButtons
                  apple={meta.apple}
                  google={meta.google}
                  label={projects.getItOn}
                  compact
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
