// src/controllers/loan.controller.ts
import { Request, Response } from 'express';
import LoanRecord from '../models/LoanRecord';

// Apply for a loan
export const applyLoan = async (req: any, res: Response) => {
  const userId = req.user._id;
  const { amount, term } = req.body;

  const loan = await LoanRecord.create({
    user: userId,
    amount,
    term,
    status: 'pending',
    issuedAt: new Date(),
  });

  res.status(201).json(loan);
};

// Get all loans of the user
export const getLoanRecords = async (req: any, res: Response) => {
  const userId = req.user._id;
  const loans = await LoanRecord.find({ user: userId }).sort({ issuedAt: -1 });
  res.json(loans);
};
