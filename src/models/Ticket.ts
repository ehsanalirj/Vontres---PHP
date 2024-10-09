import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'pending_customer';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'bug' | 'feature_request' | 'support' | 'billing' | 'other';
  createdBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
  category: string;
  attachments: string[];
  comments: {
    user: mongoose.Types.ObjectId;
    content: string;
    isInternal: boolean;
    createdAt: Date;
  }[];
  sla: {
    responseTime: Date;
    resolutionTime: Date;
  };
  tags: string[];
  relatedTickets: mongoose.Types.ObjectId[];
}

const TicketSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed', 'pending_customer'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  type: { type: String, enum: ['bug', 'feature_request', 'support', 'billing', 'other'], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  category: { type: String, required: true },
  attachments: [{ type: String }],
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    isInternal: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  sla: {
    responseTime: { type: Date },
    resolutionTime: { type: Date }
  },
  tags: [{ type: String }],
  relatedTickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
}, { timestamps: true });

export default mongoose.model<ITicket>('Ticket', TicketSchema);