import { OpenAIApi, Configuration } from 'openai';
import User from '../models/User';
import Call from '../models/Call';

export class AICallRoutingService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async routeCall(call: Call): Promise<User> {
    const callContext = `Customer: ${call.customerName}\nIssue: ${call.issue}\nPriority: ${call.priority}`;
    
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Given the following call context, suggest the best department and agent skills to handle this call:\n\n${callContext}\n\nDepartment:`,
      max_tokens: 50
    });

    const suggestion = response.data.choices[0].text?.trim();
    const [department, ...skills] = suggestion?.split(',').map(s => s.trim()) || [];

    const bestAgent = await User.findOne({
      role: 'agent',
      department: department,
      skills: { $all: skills }
    }).sort({ currentCalls: 1 }).exec();

    if (!bestAgent) {
      // If no perfect match, find the next best available agent
      return User.findOne({ role: 'agent', department: department })
        .sort({ currentCalls: 1 })
        .exec();
    }

    return bestAgent;
  }
}