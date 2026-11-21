import { projectMeta } from "./projects";

// Mobile apps published on the stores. Names and descriptions live in the
// dictionaries, keyed by `slug`. Only listed stores get a button.
export const appMeta = {
  karadastore: {
    icon: "/apps/karadastore.png",
    apple: projectMeta.karadastore.stores.apple,
    google: projectMeta.karadastore.stores.google,
  },
  baitalnono: {
    icon: "/apps/baitalnono.png",
    apple:
      "https://apps.apple.com/iq/app/%D8%A8%D9%8A%D8%AA-%D8%A7%D9%84%D9%86%D9%88%D9%86%D9%88/id6761324923",
    google:
      "https://play.google.com/store/apps/details?id=com.puretik.baitalnono&hl=ar",
  },
  platinum: {
    icon: "/apps/platinum.png",
    apple:
      "https://apps.apple.com/iq/app/%D8%A8%D9%84%D8%A7%D8%AA%D9%8A%D9%86%D9%8A%D9%88%D9%85-%D8%B3%D8%AA%D9%88%D8%B1/id6757664606",
    google:
      "https://play.google.com/store/apps/details?id=com.puretik.platinum&hl=ar",
  },
  drnote: {
    icon: "/apps/drnote.png",
    apple: "https://apps.apple.com/iq/app/dr-note/id6817752551",
    google:
      "https://play.google.com/store/apps/details?id=com.puretik.drnote&hl=ar",
  },
  litecashier: {
    icon: "/apps/litecashier.png",
    apple:
      "https://apps.apple.com/iq/app/%D9%84%D8%A7%D9%8A%D8%AA-%D9%83%D8%A7%D8%B4%D9%8A%D8%B1/id6774654267",
  },
  alsafigroup: {
    icon: "/apps/alsafigroup.png",
    apple:
      "https://apps.apple.com/iq/app/%D8%A7%D9%84%D8%B5%D8%A7%D9%81%D9%8A-%D9%83%D8%B1%D9%88%D8%A8/id6759248727",
    google:
      "https://play.google.com/store/apps/details?id=com.puretik.alsafi&hl=ar",
  },
} as const satisfies Record<
  string,
  { icon: string; apple?: string; google?: string }
>;

export type AppSlug = keyof typeof appMeta;

export function getAppMeta(slug: string): {
  icon: string;
  apple?: string;
  google?: string;
} {
  return appMeta[slug as AppSlug];
}
