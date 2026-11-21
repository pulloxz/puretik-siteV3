import { describe, expect, it } from "vitest";
import { getDictionary } from "./get-dictionary";
import { COMPANY } from "@/lib/company";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) {
    return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`));
  }
  if (obj && typeof obj === "object") {
    return Object.entries(obj).flatMap(([k, v]) =>
      keyPaths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

function strings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(strings);
  if (obj && typeof obj === "object") return Object.values(obj).flatMap(strings);
  return [];
}

describe("dictionaries", () => {
  const ar = getDictionary("ar");
  const en = getDictionary("en");

  it("have identical key sets in ar and en", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(ar).sort());
  });

  it("have no empty strings", () => {
    for (const d of [ar, en]) {
      expect(strings(d).filter((s) => s.trim() === "")).toEqual([]);
    }
  });

  it("keeps the Arabic hero tagline", () => {
    expect(`${ar.hero.titleLead} ${ar.hero.titleAccent}`).toBe(
      "تكنولوجيا تواكب طموحك",
    );
  });

  it("uses the official contact details", () => {
    expect(COMPANY.phone).toBe("+9647710553120");
    expect(COMPANY.email).toBe("info@puretik.com");
    expect(ar.contact.address).toBe(
      "الكرادة - شارع الصناعة - المسار مول - مكتب رقم 42",
    );
  });

  it("lists three real projects in both locales", () => {
    expect(ar.projects.items.map((p) => p.slug)).toEqual([
      "drlab",
      "karadastore",
      "puretik-store",
    ]);
    expect(en.projects.items.map((p) => p.slug)).toEqual(
      ar.projects.items.map((p) => p.slug),
    );
  });
});
