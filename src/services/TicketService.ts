import Ticket, { ITicket } from '../models/Ticket';
import User from '../models/User';
import { NotificationService } from './NotificationService';
import { AIService } from './AIService';

export class TicketService {
  static async createTicket(ticketData: Partial<ITicket>): Promise<ITicket> {
    const ticket = new Ticket(ticketData);
    await ticket.save();
    await NotificationService.notifyNewTicket(ticket);
    await this.assignTicketAutomatically(ticket);
    return ticket;
  }

  static async updateTicket(id: string, updateData: Partial<ITicket>): Promise<ITicket | null> {
    const ticket = await Ticket.findByIdAndUpdate(id, updateData, { new: true });
    if (ticket) {
      await NotificationService.notifyTicketUpdate(ticket);
      await this.checkSLA(ticket);
    }
    return ticket;
  }

  static async assignTicket(id: string, userId: string): Promise<ITicket | null> {
    const ticket = await Ticket.findByIdAndUpdate(id, { assignedTo: userId }, { new: true });
    if (ticket) {
      await NotificationService.notifyTicketAssignment(ticket);
    }
    return ticket;
  }

  static async addComment(id: string, userId: string, content: string, isInternal: boolean): Promise<ITicket | null> {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { $push: { comments: { user: userId, content, isInternal, createdAt: new Date() } } },
      { new: true }
    );
    if (ticket) {
      await NotificationService.notifyNewComment(ticket);
    }
    return ticket;
  }

  static async getTicketsByCompany(companyId: string): Promise<ITicket[]> {
    return Ticket.find({ company: companyId }).populate('createdBy assignedTo');
  }

  static async getTicketsByAgent(agentId: string): Promise<ITicket[]> {
    return Ticket.find({ assignedTo: agentId }).populate('createdBy company');
  }

  static async assignTicketAutomatically(ticket: ITicket): Promise<void> {
    const bestAgent = await AIService.findBestAgentForTicket(ticket);
    if (bestAgent) {
      await this.assignTicket(ticket._id, bestAgent._id);
    }
  }

  static async checkSLA(ticket: ITicket): Promise<void> {
    const slaStatus = await AIService.checkSLAStatus(ticket);
    if (slaStatus.isViolated) {
      await NotificationService.notifySLAViolation(ticket, slaStatus);
    }
  }

  static async suggestRelatedTickets(ticket: ITicket): Promise<ITicket[]> {
    return AIService.findRelatedTickets(ticket);
  }
}