import Image from "next/image";

// The visual for one product: its whole screenshot, uncropped, on a panel in
// the product's own color. The only motion is a small lift on hover.
export function ProjectShowcase({
  href,
  image,
  panel,
  name,
  visit,
  className = "",
}: {
  href: string;
  image: string;
  panel: string;
  name: string;
  visit: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${visit}`}
      className={`group relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl sm:aspect-[4/3.4] sm:rounded-3xl ${className}`}
      style={{ background: panel }}
    >
      {/* The frame uses the screenshot's own proportions (800x866), so nothing is cropped. */}
      <span className="relative block aspect-[800/866] w-[62%] overflow-hidden rounded-xl border border-white/25 bg-black shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:-translate-y-1.5 sm:w-[58%] sm:rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 320px, 60vw"
          className="object-cover"
        />
      </span>
    </a>
  );
}
