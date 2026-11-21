import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { projectMeta, type ProjectSlug } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Full-width case studies, one per product, alternating sides. The screenshot
// sits on an offset brand-gradient block instead of a floating card.
export function Projects({ dict }: { dict: Dictionary }) {
  const { projects } = dict;
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
      <SectionHeading
        eyebrow={projects.eyebrow}
        title={projects.title}
        subtitle={projects.subtitle}
      />
      <div className="space-y-16 sm:space-y-28">
        {projects.items.map((p, i) => {
          const meta = projectMeta[p.slug as ProjectSlug];
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.slug}>
              <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} — ${projects.visit}`}
                  className={`group relative block ${flip ? "md:order-2" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-gradient-to-br from-accent to-lime transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 rtl:-translate-x-4 rtl:group-hover:-translate-x-6"
                  />
                  <span className="relative block aspect-[4/3.4] overflow-hidden rounded-3xl border border-border bg-bg-elevated">
                    <Image
                      src={meta.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="object-cover object-top"
                    />
                  </span>
                </a>

                <div>
                  <p className="flex items-center gap-3 text-sm font-medium text-accent">
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-accent" aria-hidden="true" />
                    {p.category}
                  </p>
                  <h3 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
                    {p.name}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                    {p.summary}
                  </p>
                  <a
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-8 inline-flex items-center gap-2 border-b border-fg/30 pb-1 font-medium transition hover:border-accent hover:text-accent"
                  >
                    {projects.visit}
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
