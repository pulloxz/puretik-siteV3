import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getProjectMeta } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectShowcase } from "./ProjectShowcase";
import { StoreButtons } from "./StoreButtons";

// Full-width case studies, one per product, alternating sides. Each product
// sits on a panel in its own color, with the screenshot peeking up from the
// bottom edge.
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
      <div className="space-y-14 sm:space-y-28">
        {projects.items.map((p, i) => {
          const meta = getProjectMeta(p.slug);
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.slug}>
              <article className="grid items-center gap-7 md:grid-cols-2 md:gap-16">
                <ProjectShowcase
                  href={meta.url}
                  image={meta.image}
                  panel={meta.panel}
                  name={p.name}
                  visit={projects.visit}
                  className={flip ? "md:order-2" : ""}
                />

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
                  {meta.stores && (
                    <StoreButtons
                      apple={meta.stores.apple}
                      google={meta.stores.google}
                      label={projects.getItOn}
                    />
                  )}
                  <a
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-5 inline-flex items-center gap-2 border-b border-fg/30 pb-1 font-medium transition hover:border-accent hover:text-accent sm:mt-8"
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
