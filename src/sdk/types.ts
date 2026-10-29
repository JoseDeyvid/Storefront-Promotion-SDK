export type PromoConfig = {
  threshold: number;
  rewardLabel: string;
  code: string;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
};

export const samplePromo: PromoConfig = {
  threshold: 75,
  rewardLabel: "free tote",
  code: "GIFT75",
  colors: {
    background: "#111827",
    text: "#f9fafb",
    accent: "#f59e0b",
  },
};
