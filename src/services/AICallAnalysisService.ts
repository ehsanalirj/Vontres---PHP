import OpenAI from 'openai';
import { Call } from '../models/Call';

export class AICallAnalysisService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async analyzeCall(call: Call): Promise<{ sentiment: number; suggestions: string[] }> {
    const transcript = call.transcript;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI assistant that analyzes call transcripts and provides sentiment analysis and suggestions for improvement." },
        { role: "user", content: `Analyze the following call transcript and provide a sentiment score (-1 to 1) and three suggestions for improvement:\n\n${transcript}` }
      ],
    });

    const analysis = response.choices[0].message.content;
    const [sentimentStr, ...suggestionsList] = analysis.split('\n');
    const sentiment = parseFloat(sentimentStr);
    const suggestions = suggestionsList.map(s => s.trim());

    return { sentiment, suggestions };
  }

  async generateResponse(context: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI assistant helping a call center agent. Provide a helpful and professional response." },
        { role: "user", content: `Given the following context, generate an appropriate response:\n\n${context}` }
      ],
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";
  }
}