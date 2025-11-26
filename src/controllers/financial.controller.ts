// src/controllers/financial.controller.ts
import { Request, Response } from 'express';
import FinancialData from '../models/FinancialData';
import { calculateCreditScore } from '../services/score.service';

// Add financial data
export const addFinancialData = async (req: any, res: Response) => {
  const userId = req.user._id;
  const existingData = await FinancialData.findOne({ user: userId });
  if (existingData) return res.status(400).json({ message: 'Financial data already exists' });

  const data = await FinancialData.create({ user: userId, ...req.body });
  await calculateCreditScore(userId);
  res.status(201).json(data);
};

// Update financial data
export const updateFinancialData = async (req: any, res: Response) => {
  const userId = req.user._id;
  const data = await FinancialData.findOneAndUpdate(
    { user: userId },
    { ...req.body },
    { new: true }
  );
  if (!data) return res.status(404).json({ message: 'Financial data not found' });

  await calculateCreditScore(userId);
  res.json(data);
};

// Get financial data
export const getFinancialData = async (req: any, res: Response) => {
  const userId = req.user._id;
  const data = await FinancialData.findOne({ user: userId });
  if (!data) return res.status(404).json({ message: 'Financial data not found' });
  res.json(data);
};
