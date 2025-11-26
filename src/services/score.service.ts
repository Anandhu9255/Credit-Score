// src/services/score.service.ts
import FinancialData, { IFinancialData } from '../models/FinancialData';
import ScoreHistory from '../models/ScoreHistory';
import mongoose from 'mongoose';

/**
 * Calculates a simple credit score based on financial data.
 * You can expand this algorithm later.
 */
export const calculateCreditScore = async (userId: mongoose.Types.ObjectId) => {
  const financialData: IFinancialData | null = await FinancialData.findOne({ user: userId });

  if (!financialData) {
    throw new Error('Financial data not found');
  }

  let score = 300; // base score

  // Basic algorithm
  score += financialData.income / 1000; // income factor
  score += financialData.onTimePayments * 10; // payment history
  score -= financialData.missedPayments * 20; // missed payments penalty
  score += Math.min(financialData.creditAgeMonths / 12, 5) * 10; // credit age bonus
  score = Math.min(Math.max(score, 300), 900); // clamp score between 300-900

  // Save to financialData and score history
  financialData.creditScore = score;
  financialData.updatedAt = new Date();
  await financialData.save();

  const scoreRecord = new ScoreHistory({
    user: userId,
    creditScore: score,
    date: new Date(),
  });

  await scoreRecord.save();

  return score;
};
