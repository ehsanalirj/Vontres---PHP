import { Configuration, OpenAIApi } from 'openai';
import { EmotionAI } from './EmotionAI';

export class AdvancedAI {
  private openai: OpenAIApi;
  private emotionAI: EmotionAI;

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
    this.emotionAI = new EmotionAI();
  }

  async analyzeConversation(transcript: string) {
    const completion = await this.openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Analyze the following sales call transcript and provide suggestions:\n\n${transcript}`,
      max_tokens: 150
    });

    return completion.data.choices[0].text;
  }

  async detectEmotion(audioBuffer: ArrayBuffer) {
    return this.emotionAI.detectEmotion(audioBuffer);
  }
}