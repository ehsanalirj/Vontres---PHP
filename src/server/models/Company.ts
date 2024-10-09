import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  website: string;
  customDomain?: string;
  logo: string;
  departments: string[];
  roles: Array<{ name: string; department: string }>;
  hierarchy: any;
  twilioNumbers: Array<{
    number: string;
    department: string;
    type: 'inbound' | 'outbound' | 'hybrid';
  }>;
  openAISettings: {
    apiKey: string;
    useGPT4: boolean;
    maxTokens: number;
  };
  scripts: Array<{ name: string; content: string }>;
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    encryption: 'tls' | 'ssl';
    fromEmail: string;
    fromName: string;
  };
  setupProgress: number;
  skipWizard: boolean;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  website: { type: String },
  customDomain: { type: String, unique: true, sparse: true },
  logo: { type: String },
  departments: [{ type: String }],
  roles: [{ name: String, department: String }],
  hierarchy: { type: Schema.Types.Mixed },
  twilioNumbers: [{
    number: String,
    department: String,
    type: { type: String, enum: ['inbound', 'outbound', 'hybrid'] }
  }],
  openAISettings: {
    apiKey: String,
    useGPT4: Boolean,
    maxTokens: Number,
  },
  scripts: [{ name: String, content: String }],
  emailSettings: {
    smtpHost: String,
    smtpPort: Number,
    smtpUsername: String,
    smtpPassword: String,
    encryption: { type: String, enum: ['tls', 'ssl'] },
    fromEmail: String,
    fromName: String,
  },
  setupProgress: { type: Number, default: 0 },
  skipWizard: { type: Boolean, default: false },
});

export default mongoose.model<ICompany>('Company', CompanySchema);