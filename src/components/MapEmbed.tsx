import { ExternalLink } from "lucide-react";
import { COMPANY } from "@/lib/company";

// Google Maps centered on the office, with a pin on the place. The embed needs
// no API key: Google finds the place from its name.
export function MapEmbed({
  title,
  openLabel,
  lang,
}: {
  title: string;
  openLabel: string;
  lang: string;
}) {
  const q = encodeURIComponent(COMPANY.mapQuery);
  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-3xl border border-border">
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${q}&z=16&hl=${lang}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-72 w-full border-0 sm:h-80"
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium transition hover:text-accent"
      >
        {openLabel}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
