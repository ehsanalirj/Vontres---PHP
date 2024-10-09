import { OpenAIApi, Configuration } from 'openai';

export class SentimentAnalysisService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeSentiment(text: string): Promise<{ sentiment: number; emotion: string }> {
    const response = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Analyze the sentiment and emotion of the following text. Provide a sentiment score from -1 (very negative) to 1 (very positive) and the primary emotion:\n\n${text}\n\nSentiment:`,
      max_tokens: 50
    });

    const result = response.data.choices[0].text?.trim().split('\n');
    const sentiment = parseFloat(result?.[0] || '0');
    const emotion = result?.[1] || 'neutral';

    return { sentiment, emotion };
  }
}