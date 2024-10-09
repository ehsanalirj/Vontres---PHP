import { OpenAIApi, Configuration } from 'openai';
import { TicketService } from './TicketService';
import { KnowledgeBaseService } from './KnowledgeBaseService';

export class ChatbotService {
  private static openai: OpenAIApi;

  static initialize() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  static async processMessage(userId: string, message: string): Promise<string> {
    // First, check if the message is about creating a ticket
    if (message.toLowerCase().includes('create ticket') || message.toLowerCase().includes('new ticket')) {
      return this.handleTicketCreation(userId, message);
    }

    // If not, try to find an answer in the knowledge base
    const knowledgeBaseAnswer = await KnowledgeBaseService.findAnswer(message);
    if (knowledgeBaseAnswer) {
      return knowledgeBaseAnswer;
    }

    // If no answer in the knowledge base, use GPT to generate a response
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `User: ${message}\nChatbot:`,
      max_tokens: 150
    });

    return response.data.choices[0].text?.trim() || "I'm sorry, I couldn't understand that. Could you please rephrase?";
  }

  private static async handleTicketCreation(userId: string, message: string): Promise<string> {
    // Extract ticket details from the message
    const title = message.split('\n')[0].replace('create ticket', '').trim();
    const description = message.split('\n').slice(1).join('\n').trim();

    // Create the ticket
    const ticket = await TicketService.createTicket({
      title,
      description,
      createdBy: userId,
      type: 'support', // Default type, can be changed later
      priority: 'medium', // Default priority, can be changed later
    });

    return `Ticket created successfully. Your ticket number is ${ticket._id}. We'll get back to you soon.`;
  }
}