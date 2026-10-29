export type Progress = {
  remaining: number;
  completed: boolean;
};

/**
 * Placeholder. Replace this with the real remaining-amount calculation.
 * The result must always include `remaining` and `completed`.
 */
export function getProgress(_subtotal: number, _threshold: number): Progress {
  return { remaining: 0, completed: false };
}
