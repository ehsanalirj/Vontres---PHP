import twilio from 'twilio';
import { ICall } from '../models/Call';

export class TwilioService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async makeCall(to: string, from: string): Promise<string> {
    const call = await this.client.calls.create({
      url: 'http://your-app-url.com/api/twilio/voice',
      to,
      from,
    });
    return call.sid;
  }

  async getRecording(call: ICall): Promise<string> {
    const recording = await this.client.recordings.get(call.recording).fetch();
    return recording.mediaUrl;
  }

  async getTranscript(call: ICall): Promise<string> {
    const transcript = await this.client.transcriptions(call.recording).fetch();
    return transcript.transcriptionText;
  }
}