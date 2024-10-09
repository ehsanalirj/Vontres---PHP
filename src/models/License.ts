import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface ILicense extends Document {
  key: string;
  email: string;
  companyName: string;
  expirationDate: Date;
  isActive: boolean;
  generateKey(): string;
}

const LicenseSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

LicenseSchema.methods.generateKey = function(): string {
  const secret = process.env.LICENSE_SECRET || 'your-secret-key';
  const data = `${this.email}|${this.companyName}|${this.expirationDate.toISOString()}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

LicenseSchema.pre<ILicense>('save', function(next) {
  if (!this.key) {
    this.key = this.generateKey();
  }
  next();
});

export default mongoose.model<ILicense>('License', LicenseSchema);