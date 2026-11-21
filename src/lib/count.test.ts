import { describe, expect, it } from "vitest";
import { formatCount } from "./count";

describe("formatCount", () => {
  it("rounds and never groups digits, so years stay readable", () => {
    expect(formatCount(2023)).toBe("2023");
    expect(formatCount(17.6)).toBe("18");
    expect(formatCount(0)).toBe("0");
  });
});
