import type { Dictionary } from "@/i18n/get-dictionary";

// A moving ribbon of service names. dir="ltr" keeps the scroll math simple in
// both languages; each phrase still renders with correct Arabic shaping.
export function Marquee({ dict }: { dict: Dictionary }) {
  const words = dict.services.items.map((s) => s.title);
  const row = (suffix: string) =>
    words.map((w, i) => (
      <span key={`${suffix}${i}`} className="flex items-center gap-10 px-5">
        <span>{w}</span>
        <span aria-hidden="true" className="text-xl">
          ✦
        </span>
      </span>
    ));

  return (
    // Pulled up so the band straddles the bottom edge of the hero.
    <div className="relative z-10 -mt-[4.5rem] overflow-hidden py-10" aria-hidden="true">
      <div
        dir="ltr"
        className="-rotate-[1.5deg] scale-[1.03] bg-gradient-to-r from-accent to-lime py-4 text-xl font-bold text-black"
      >
        <div className="marquee-track">
          <div className="flex shrink-0 items-center">{row("a")}</div>
          <div className="flex shrink-0 items-center">{row("b")}</div>
        </div>
      </div>
    </div>
  );
}
