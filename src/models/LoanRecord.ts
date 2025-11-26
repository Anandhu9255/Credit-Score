// src/models/LoanRecord.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ILoanRecord extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  issuedAt?: Date;
  repaidAt?: Date;
}

const LoanRecordSchema: Schema<ILoanRecord> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  issuedAt: { type: Date },
  repaidAt: { type: Date },
});

export default mongoose.model<ILoanRecord>('LoanRecord', LoanRecordSchema);
