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
});
