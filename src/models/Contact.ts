import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: mongoose.Types.ObjectId;
  customFields: { [key: string]: string };
  tags: string[];
}

const ContactSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  customFields: { type: Map, of: String },
  tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IContact>('Contact', ContactSchema);