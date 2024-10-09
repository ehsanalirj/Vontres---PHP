import mongoose, { Document, Schema } from 'mongoose';

export interface ICallSurvey extends Document {
  call: mongoose.Types.ObjectId;
  agent: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  reachOutReason: string;
  summary: string;
  resolved: boolean;
  additionalNotes: string;
}

const CallSurveySchema: Schema = new Schema({
  call: { type: Schema.Types.ObjectId, ref: 'Call', required: true },
  agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  reachOutReason: { type: String, required: true },
  summary: { type: String, required: true },
  resolved: { type: Boolean, required: true },
  additionalNotes: { type: String },
}, { timestamps: true });

export default mongoose.model<ICallSurvey>('CallSurvey', CallSurveySchema);