import { ar, type Dictionary } from "./dictionaries/ar";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale];
