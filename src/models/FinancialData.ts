// src/models/FinancialData.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFinancialData extends Document {
  user: mongoose.Types.ObjectId;
  income: number;
  currentLoans: number[];
  onTimePayments: number;
  missedPayments: number;
  creditAgeMonths: number;
  creditScore: number;
  updatedAt: Date;
}

const FinancialDataSchema: Schema<IFinancialData> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  income: { type: Number, default: 0 },
  currentLoans: { type: [Number], default: [] },
  onTimePayments: { type: Number, default: 0 },
  missedPayments: { type: Number, default: 0 },
  creditAgeMonths: { type: Number, default: 0 },
  creditScore: { type: Number, default: 300 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFinancialData>('FinancialData', FinancialDataSchema);
