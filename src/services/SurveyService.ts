import axios from 'axios';
import Call from '../models/Call';

export class SurveyService {
  static async sendSurvey(callId: string) {
    const call = await Call.findById(callId).populate('customer');
    if (!call) {
      throw new Error('Call not found');
    }

    const surveyLink = `https://your-survey-tool.com/survey/${callId}`;
    
    // Send email to customer
    await axios.post('/api/send-email', {
      to: call.customer.email,
      subject: 'Please rate your recent call experience',
      body: `Dear ${call.customer.name},

We value your feedback. Please take a moment to rate your recent call experience:

${surveyLink}

Thank you for your time.

Best regards,
Your Company`
    });

    // Update call record to mark survey as sent
    call.surveySent = true;
    await call.save();
  }

  static async processSurveyResults(callId: string, results: any) {
    const call = await Call.findById(callId);
    if (!call) {
      throw new Error('Call not found');
    }

    call.surveyResults = results;
    call.csat = results.overallSatisfaction;
    await call.save();

    // Trigger any necessary notifications or reports based on the survey results
  }
}