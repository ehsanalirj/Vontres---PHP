import { LanguageServiceClient } from '@google-cloud/language';
import { TranslationServiceClient } from '@google-cloud/translate';

export class NLPService {
  private languageClient: LanguageServiceClient;
  private translationClient: TranslationServiceClient;

  constructor() {
    this.languageClient = new LanguageServiceClient();
    this.translationClient = new TranslationServiceClient();
  }

  async analyzeSentiment(text: string) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await this.languageClient.analyzeSentiment({ document });
    return result.documentSentiment;
  }

  async translateText(text: string, targetLanguage: string) {
    const [response] = await this.translationClient.translateText({
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}`,
      contents: [text],
      mimeType: 'text/plain',
      targetLanguageCode: targetLanguage,
    });

    return response.translations[0].translatedText;
  }
}