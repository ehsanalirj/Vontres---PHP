import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  tier: 'single' | 'small' | 'large' | 'enterprise';
  maxAgents: number;
  features: string[];
  customDomain?: string;
  subscriptionPlan: 'basic' | 'pro' | 'enterprise';
  customFields: { [key: string]: string };
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  tier: { type: String, enum: ['single', 'small', 'large', 'enterprise'], required: true },
  maxAgents: { type: Number, required: true },
  features: [{ type: String }],
  customDomain: { type: String, unique: true, sparse: true },
  subscriptionPlan: { type: String, enum: ['basic', 'pro', 'enterprise'], default: 'basic' },
  customFields: { type: Map, of: String },
}, { timestamps: true });

export default mongoose.model<ICompany>('Company', CompanySchema);