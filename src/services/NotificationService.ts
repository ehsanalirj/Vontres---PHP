import nodemailer from 'nodemailer';
import User from '../models/User';
import { ITicket } from '../models/Ticket';

export class NotificationService {
  private static transporter = nodemailer.createTransport({
    // Configure your email service here
  });

  static async notifyNewTicket(ticket: ITicket): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(admin.email, 'New Ticket Created', `A new ticket has been created: ${ticket.title}`);
    }
  }

  static async notifyTicketUpdate(ticket: ITicket): Promise<void> {
    if (ticket.assignedTo) {
      const agent = await User.findById(ticket.assignedTo);
      if (agent) {
        await this.sendEmail(agent.email, 'Ticket Updated', `Ticket ${ticket.title} has been updated`);
      }
    }
  }

  static async notifyTicketAssignment(ticket: ITicket): Promise<void> {
    if (ticket.assignedTo) {
      const agent = await User.findById(ticket.assignedTo);
      if (agent) {
        await this.sendEmail(agent.email, 'New Ticket Assigned', `You have been assigned a new ticket: ${ticket.title}`);
      }
    }
  }

  static async notifyNewComment(ticket: ITicket): Promise<void> {
    const notifyUsers = await User.find({ 
      $or: [
        { _id: ticket.createdBy },
        { _id: ticket.assignedTo }
      ]
    });

    for (const user of notifyUsers) {
      await this.sendEmail(user.email, 'New Comment on Ticket', `A new comment has been added to ticket: ${ticket.title}`);
    }
  }

  static async notifySLAViolation(ticket: ITicket, slaStatus: { isViolated: boolean; reason?: string }): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(admin.email, 'SLA Violation', `SLA violated for ticket ${ticket.title}. Reason: ${slaStatus.reason}`);
    }
  }

  static async notifyAdminOfIssue(errorLog: string, suggestedFix: string): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(admin.email, 'System Issue Detected', `Error Log: ${errorLog}\n\nSuggested Fix: ${suggestedFix}`);
    }
  }

  static async notifyAdminOfCriticalIssue(errorLog: string, suggestedFix: string): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(admin.email, 'CRITICAL System Issue Detected', `Critical Error Log: ${errorLog}\n\nSuggested Fix: ${suggestedFix}\n\nImmediate action required!`);
    }
  }

  static async notifyAdminOfAutoFix(errorLog: string, appliedFix: string): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(admin.email, 'Automatic Fix Applied', `An issue was automatically fixed.\n\nError Log: ${errorLog}\n\nApplied Fix: ${appliedFix}`);
    }
  }

  static async notifyAdminOfPotentialIssue(metrics: Record<string, number>, probability: number): Promise<void> {
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await this.sendEmail(
        admin.email,
        'Potential System Issue Detected',
        `Our predictive maintenance system has detected a potential issue.\n\nCurrent Metrics:\n${JSON.stringify(metrics, null, 2)}\n\nProbability of Issue: ${probability.toFixed(2)}`
      );
    }
  }

  static async notifyTicketEscalation(ticket: ITicket, escalatedTo: User): Promise<void> {
    await this.sendEmail(
      escalatedTo.email,
      'Ticket Escalated',
      `Ticket ${ticket.title} has been escalated to you due to SLA violation. Please address it as soon as possible.`
    );
  }

  private static async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"System Notification" <system@example.com>',
      to,
      subject,
      text
    });
  }
}