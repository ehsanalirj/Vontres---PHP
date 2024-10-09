import mongoose, { Document, Schema } from 'mongoose';

export interface ICall extends Document {
  agent: mongoose.Types.ObjectId;
  contact: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  duration: number;
  recording: string;
  transcript: string;
  sentiment: number;
  outcome: 'successful' | 'follow-up' | 'not-interested';
  notes: string;
}

const CallSchema: Schema = new Schema({
  agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contact: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number },
  recording: { type: String },
  transcript: { type: String },
  sentiment: { type: Number },
  outcome: { type: String, enum: ['successful', 'follow-up', 'not-interested'] },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.model<ICall>('Call', CallSchema);