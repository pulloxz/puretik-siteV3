import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "./Reveal";
import { Terminal } from "./Terminal";

export function DevSection({ dict }: { dict: Dictionary }) {
  const t = dict.terminal;
  return (
    <section id="build" className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium text-muted">
            <span dir="ltr" className="font-mono text-accent">
              {"//"}
            </span>
            {t.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            {t.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Terminal
            text={{
              steps: t.steps,
              tests: t.tests,
              ready: t.ready,
              live: t.live,
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
