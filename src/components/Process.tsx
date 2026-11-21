import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// A solid brand-gradient band with black type: the one loud break in the page.
export function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  return (
    <section
      id="process"
      className="bg-gradient-to-br from-accent to-lime px-4 py-28 text-black sm:px-6 rtl:bg-gradient-to-bl"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="light"
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08}>
                <div className="border-t-2 border-black pt-6">
                  <span className="block text-7xl font-extrabold leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-black/70">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
