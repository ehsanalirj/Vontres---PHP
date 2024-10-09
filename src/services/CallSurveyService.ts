import CallSurvey, { ICallSurvey } from '../models/CallSurvey';

export class CallSurveyService {
  static async createSurvey(surveyData: Partial<ICallSurvey>): Promise<ICallSurvey> {
    const survey = new CallSurvey(surveyData);
    await survey.save();
    return survey;
  }

  static async getSurveysByAgent(agentId: string): Promise<ICallSurvey[]> {
    return CallSurvey.find({ agent: agentId }).populate('call customer');
  }

  static async getSurveysByCustomer(customerId: string): Promise<ICallSurvey[]> {
    return CallSurvey.find({ customer: customerId }).populate('call agent');
  }

  static async getCompanySurveys(companyId: string): Promise<ICallSurvey[]> {
    return CallSurvey.find()
      .populate({
        path: 'agent',
        match: { company: companyId },
      })
      .populate('call customer')
      .then(surveys => surveys.filter(survey => survey.agent !== null));
  }
}