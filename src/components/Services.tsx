import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// An editorial index instead of a card grid: one big row per service.
export function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={services.title}
        subtitle={services.subtitle}
      />
      <ul>
        {services.items.map((item, i) => (
          <li key={item.key} className="group border-t border-border last:border-b">
            <Reveal delay={i * 0.04}>
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 px-3 py-8 transition-colors duration-300 group-hover:bg-accent md:grid-cols-[5rem_1.1fr_1.4fr] md:gap-x-8 md:px-6">
                <span className="text-sm font-bold tabular-nums text-accent transition-colors group-hover:text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold transition-colors group-hover:text-black md:text-4xl">
                  {item.title}
                </h3>
                <p className="col-span-2 leading-relaxed text-muted transition-colors group-hover:text-black/70 md:col-span-1">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
