import { TwilioService } from './TwilioService';
import { EmailService } from './EmailService';
import { ChatService } from './ChatService';
import { SocialMediaService } from './SocialMediaService';

export class OmnichannelService {
  private twilioService: TwilioService;
  private emailService: EmailService;
  private chatService: ChatService;
  private socialMediaService: SocialMediaService;

  constructor() {
    this.twilioService = new TwilioService();
    this.emailService = new EmailService();
    this.chatService = new ChatService();
    this.socialMediaService = new SocialMediaService();
  }

  async handleIncomingInteraction(type: 'call' | 'email' | 'chat' | 'social', data: any) {
    switch (type) {
      case 'call':
        return this.twilioService.handleIncomingCall(data);
      case 'email':
        return this.emailService.handleIncomingEmail(data);
      case 'chat':
        return this.chatService.handleIncomingChat(data);
      case 'social':
        return this.socialMediaService.handleIncomingMessage(data);
      default:
        throw new Error('Unsupported interaction type');
    }
  }

  async sendOutgoingInteraction(type: 'call' | 'email' | 'chat' | 'social', data: any) {
    switch (type) {
      case 'call':
        return this.twilioService.makeOutgoingCall(data);
      case 'email':
        return this.emailService.sendEmail(data);
      case 'chat':
        return this.chatService.sendChatMessage(data);
      case 'social':
        return this.socialMediaService.sendSocialMessage(data);
      default:
        throw new Error('Unsupported interaction type');
    }
  }

  async getInteractionHistory(customerId: string) {
    const calls = await this.twilioService.getCallHistory(customerId);
    const emails = await this.emailService.getEmailHistory(customerId);
    const chats = await this.chatService.getChatHistory(customerId);
    const socialInteractions = await this.socialMediaService.getSocialInteractionHistory(customerId);

    return {
      calls,
      emails,
      chats,
      socialInteractions
    };
  }
}