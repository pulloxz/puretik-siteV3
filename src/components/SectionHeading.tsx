import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p
        className={`flex items-center gap-3 text-sm font-medium ${
          light ? "text-black/70" : "text-muted"
        }`}
      >
        <span
          dir="ltr"
          className={`font-mono ${light ? "text-black" : "text-accent"}`}
          aria-hidden="true"
        >
          {"//"}
        </span>
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-xl text-lg leading-relaxed ${
            light ? "text-black/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
