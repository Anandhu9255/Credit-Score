// src/controllers/score.controller.ts
import { Request, Response } from 'express';
import { calculateCreditScore } from '../services/score.service';
import ScoreHistory from '../models/ScoreHistory';

// Get current credit score
export const getCreditScore = async (req: any, res: Response) => {
  const userId = req.user._id;

  try {
    const score = await calculateCreditScore(userId);
    res.json({ creditScore: score });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get credit score history
export const getScoreHistory = async (req: any, res: Response) => {
  const userId = req.user._id;

  const history = await ScoreHistory.find({ user: userId }).sort({ date: -1 });
  res.json(history);
};
