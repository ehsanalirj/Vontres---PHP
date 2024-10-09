import Ticket from '../models/Ticket';
import User from '../models/User';
import { NotificationService } from './NotificationService';

export class SLAService {
  static async checkAndUpdateSLA(ticket: Ticket): Promise<void> {
    const now = new Date();
    const createdAt = new Date(ticket.createdAt);
    const elapsedHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    let slaViolated = false;
    let escalationLevel = 0;

    switch (ticket.priority) {
      case 'low':
        if (elapsedHours > 48) slaViolated = true;
        break;
      case 'medium':
        if (elapsedHours > 24) slaViolated = true;
        break;
      case 'high':
        if (elapsedHours > 8) slaViolated = true;
        break;
      case 'urgent':
        if (elapsedHours > 4) slaViolated = true;
        break;
    }

    if (slaViolated) {
      if (elapsedHours > 72) escalationLevel = 2;
      else if (elapsedHours > 48) escalationLevel = 1;

      await this.escalateTicket(ticket, escalationLevel);
    }
  }

  private static async escalateTicket(ticket: Ticket, level: number): Promise<void> {
    switch (level) {
      case 1:
        // Escalate to team lead
        const teamLead = await User.findOne({ role: 'team_lead' });
        if (teamLead) {
          ticket.assignedTo = teamLead._id;
          await ticket.save();
          await NotificationService.notifyTicketEscalation(ticket, teamLead);
        }
        break;
      case 2:
        // Escalate to manager
        const manager = await User.findOne({ role: 'manager' });
        if (manager) {
          ticket.assignedTo = manager._id;
          await ticket.save();
          await NotificationService.notifyTicketEscalation(ticket, manager);
        }
        break;
    }
  }
}