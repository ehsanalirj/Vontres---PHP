import { Request, Response } from 'express';
import Call from '../models/Call';
import { AIService } from '../services/AIService';
import { TwilioService } from '../services/TwilioService';

const aiService = new AIService();
const twilioService = new TwilioService();

export const initiateCall = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.body;
    const agentId = req.user.id;

    const call = new Call({
      agent: agentId,
      contact: contactId,
      startTime: new Date(),
    });

    await call.save();

    const callSid = await twilioService.makeCall(call.contact.phone, process.env.TWILIO_PHONE_NUMBER);

    res.status(200).json({ message: 'Call initiated', callId: call._id, callSid });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating call', error });
  }
};

export const endCall = async (req: Request, res: Response) => {
  try {
    const { callId } = req.params;
    const call = await Call.findById(callId);

    if (!call) {
      return res.status(404).json({ message: 'Call not found' });
    }

    call.endTime = new Date();
    call.duration = (call.endTime.getTime() - call.startTime.getTime()) / 1000; // duration in seconds

    const recordingUrl = await twilioService.getRecording(call);
    call.recording = recordingUrl;

    const transcript = await twilioService.getTranscript(call);
    call.transcript = transcript;

    const analysis = await aiService.analyzeCall(call);
    call.sentiment = analysis.sentiment;

    await call.save();

    res.status(200).json({ message: 'Call ended and analyzed', call, analysis });
  } catch (error) {
    res.status(500).json({ message: 'Error ending call', error });
  }
};

export const getCallScript = async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId).populate('company');

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const script = await aiService.generateCallScript(contact);

    res.status(200).json({ script });
  } catch (error) {
    res.status(500).json({ message: 'Error generating call script', error });
  }
};