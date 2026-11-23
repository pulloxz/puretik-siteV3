import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getProjectMeta } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// One row per product, alternating sides: a panel in the product's own color
// holding its whole screenshot, next to its name, summary and tags.
export function Projects({ dict }: { dict: Dictionary }) {
  const { projects } = dict;
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        subtitle={projects.subtitle}
      />
      <div className="space-y-14 sm:space-y-24">
        {projects.items.map((p, i) => {
          const meta = getProjectMeta(p.slug);
          const ratio = meta.ratio ?? "800 / 866";
          const flip = i % 2 === 1;
          const visit = p.visit ?? projects.visit;
          return (
            <Reveal key={p.slug}>
              <article className="grid items-center gap-7 md:grid-cols-2 md:gap-14">
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} — ${visit}`}
                  className={`group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl ${
                    flip ? "md:order-2" : ""
                  }`}
                  style={{ background: meta.panel }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <span
                    style={{ aspectRatio: ratio }}
                    className="relative block w-[88%] overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 transition-transform duration-500 group-hover:-translate-y-1.5"
                  >
                    <Image
                      src={meta.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 520px, 90vw"
                      className="object-cover"
                    />
                  </span>
                </a>

                <div>
                  <p className="flex items-center gap-3 text-sm font-medium text-accent">
                    <span className="font-mono tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-accent" aria-hidden="true" />
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-4xl font-extrabold tracking-tight sm:mt-4 sm:text-6xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                    {p.summary}
                  </p>
                  <p className="mt-5 text-sm text-muted">
                    {p.tags.join("  ·  ")}
                  </p>
                  <a
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative mt-6 inline-flex items-center gap-2 border-b border-fg/30 pb-1 font-medium transition after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] hover:border-accent hover:text-accent sm:mt-8"
                  >
                    {visit}
                    <ArrowUpRight className="h-4 w-4 transition group-hover/link:-translate-y-0.5 rtl:-scale-x-100" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
