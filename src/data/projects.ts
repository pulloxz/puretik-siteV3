// Non-translatable project facts. Names, categories and summaries live in the
// dictionaries, keyed by `slug`. `panel` is the product's own color, used as
// the backdrop behind its screenshot.
type ProjectMeta = {
  url: string;
  image: string;
  /** Screenshot width / height. Defaults to the portrait 800 / 866. */
  ratio?: string;
  panel: string;
  /** Mobile app store pages, when the product has an app. */
  stores?: { apple: string; google: string };
};

export const projectMeta = {
  drlab: {
    url: "https://www.drlab.app/",
    image: "/projects/drlab-app.jpg",
    ratio: "1600 / 796",
    panel: "linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)",
  },
  karadastore: {
    url: "https://karadastore.iq/",
    image: "/projects/karadastore-web.jpg",
    ratio: "1600 / 796",
    panel: "linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)",
    stores: {
      apple: "https://apps.apple.com/us/app/karada-store/id6741197248",
      google:
        "https://play.google.com/store/apps/details?id=com.puretik.karadastore&hl=en",
    },
  },
  "puretik-store": {
    url: "https://puretik.store/",
    image: "/projects/puretik-store-web.jpg",
    ratio: "1600 / 796",
    panel: "linear-gradient(135deg, #38febf 0%, #0f9d6e 100%)",
  },
} as const satisfies Record<string, ProjectMeta>;

export type ProjectSlug = keyof typeof projectMeta;

export function getProjectMeta(slug: string): ProjectMeta {
  return projectMeta[slug as ProjectSlug];
}
