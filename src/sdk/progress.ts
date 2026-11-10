export type Progress = {
  remaining: number;
  completed: boolean;
};

/**
 * Placeholder. Replace this with the real remaining-amount calculation.
 * The result must always include `remaining` and `completed`.
 */
export function getProgress(subtotal: number, threshold: number): Progress {

  if(subtotal < 0 || threshold < 0) {
    throw new RangeError("Subtotal and threshold must be positive");
  }

  const remaining = Math.max(0, threshold - subtotal);
  return { remaining, completed: remaining === 0 };
}
