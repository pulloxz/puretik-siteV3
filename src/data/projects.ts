// Non-translatable project facts. Names, categories and summaries live in the
// dictionaries, keyed by `slug`.
export const projectMeta = {
  drlab: {
    url: "https://www.drlab.app/",
    image: "/projects/drlab.jpg",
    glow: "from-violet-500/30",
  },
  karadastore: {
    url: "https://karadastore.iq/",
    image: "/projects/karadastore.jpg",
    glow: "from-indigo-500/30",
  },
  "puretik-store": {
    url: "https://puretik.store/",
    image: "/projects/puretik-store.jpg",
    glow: "from-emerald-500/30",
  },
} as const;

export type ProjectSlug = keyof typeof projectMeta;
