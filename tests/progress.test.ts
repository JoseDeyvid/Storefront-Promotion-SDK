import { describe, expect, it } from "vitest";
import { getProgress } from "../src/sdk/progress";

describe("getProgress", () => {
  it("returns a progress result shape", () => {
    const result = getProgress(20, 75);

    expect(result).toEqual(
      expect.objectContaining({
        remaining: expect.any(Number),
        completed: expect.any(Boolean),
      }),
    );
  });
  it("returns the remaining amount when subtotal is less than threshold", () => {
    const result = getProgress(20, 75);

    expect(result).toEqual({ remaining: 55, completed: false });
  });
  it("returns completed when subtotal is equal to threshold", () => {
    const result = getProgress(75, 75);

    expect(result).toEqual({ remaining: 0, completed: true });
  });
  it("returns completed when subtotal is greater than threshhold", () => {
    const result = getProgress(100, 75);
    expect(result).toEqual({ remaining: 0, completed: true});
  })
  it("throws an error when subtotal is negative", () => {
    expect(() => getProgress(-10, 75)).toThrow(RangeError);
  });
  it("throws an error when threshold is negative", () => {
    expect(() => getProgress(10, -75)).toThrow(RangeError);
  });
});
