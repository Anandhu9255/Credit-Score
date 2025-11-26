// src/models/ScoreHistory.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IScoreHistory extends Document {
  user: mongoose.Types.ObjectId;
  creditScore: number;
  date: Date;
}

const ScoreHistorySchema: Schema<IScoreHistory> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creditScore: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IScoreHistory>('ScoreHistory', ScoreHistorySchema);
