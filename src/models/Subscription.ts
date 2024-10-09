import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  company: mongoose.Types.ObjectId;
  plan: 'basic' | 'pro' | 'enterprise';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled' | 'expired';
  paymentMethod: string;
  lastPaymentDate: Date;
  nextBillingDate: Date;
}

const SubscriptionSchema: Schema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  plan: { type: String, enum: ['basic', 'pro', 'enterprise'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
  paymentMethod: { type: String, required: true },
  lastPaymentDate: { type: Date },
  nextBillingDate: { type: Date, required: true },
}, { timestamps: true });

exportdefault mongoose.model<ISubscription>('Subscription', SubscriptionSchema);