import { OpenAIApi, Configuration } from 'openai';
import Call from '../models/Call';
import Script from '../models/Script';

export class AIFeedbackService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeCallAndImproveScript(callId: string): Promise<void> {
    const call = await Call.findById(callId).populate('script');
    if (!call || !call.transcript || !call.script) {
      throw new Error('Call, transcript, or script not found');
    }

    const analysis = await this.analyzeCall(call.transcript);
    const improvedScript = await this.improveScript(call.script.content, analysis);

    // Update the script with improvements
    await Script.findByIdAndUpdate(call.script._id, { content: improvedScript });
  }

  private async analyzeCall(transcript: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Analyze the following call transcript and provide insights on what went well and what could be improved:\n\n${transcript}\n\nAnalysis:`,
      max_tokens: 200
    });

    return response.data.choices[0].text?.trim() || '';
  }

  private async improveScript(currentScript: string, analysis: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Given the following call script and analysis, suggest improvements to the script:\n\nCurrent Script:\n${currentScript}\n\nAnalysis:\n${analysis}\n\nImproved Script:`,
      max_tokens: 500
    });

    return response.data.choices[0].text?.trim() || currentScript;
  }

  async generateAgentSuggestions(callTranscript: string): Promise<string[]> {
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Based on the following call transcript, provide three suggestions for the agent to improve their performance:\n\n${callTranscript}\n\nSuggestions:`,
      max_tokens: 150
    });

    const suggestions = response.data.choices[0].text?.trim().split('\n') || [];
    return suggestions.map(s => s.replace(/^\d+\.\s*/, '')); // Remove numbering
  }
}