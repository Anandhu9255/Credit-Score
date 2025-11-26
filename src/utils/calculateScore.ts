// src/utils/calculateScore.ts

/**
 * Optional helper to calculate a score from raw financial data.
 * Can be used inside services or controllers.
 */
export const calculateScore = (income: number, onTimePayments: number, missedPayments: number, creditAgeMonths: number) => {
  let score = 300;
  score += income / 1000;
  score += onTimePayments * 10;
  score -= missedPayments * 20;
  score += Math.min(creditAgeMonths / 12, 5) * 10;
  return Math.min(Math.max(score, 300), 900);
};
