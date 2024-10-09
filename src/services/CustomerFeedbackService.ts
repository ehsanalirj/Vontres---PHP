import Call from '../models/Call';
import Customer from '../models/Customer';

export class CustomerFeedbackService {
  async submitFeedback(callId: string, rating: number, comment: string): Promise<void> {
    const call = await Call.findById(callId);
    if (!call) {
      throw new Error('Call not found');
    }

    call.customerFeedback = { rating, comment };
    await call.save();

    // Update customer satisfaction score
    const customer = await Customer.findById(call.customerId);
    if (customer) {
      const allCalls = await Call.find({ customerId: customer._id, customerFeedback: { $exists: true } });
      const averageRating = allCalls.reduce((sum, call) => sum + call.customerFeedback.rating, 0) / allCalls.length;
      customer.satisfactionScore = averageRating;
      await customer.save();
    }
  }

  async getFeedbackStats(agentId: string): Promise<FeedbackStats> {
    const calls = await Call.find({ agentId, customerFeedback: { $exists: true } });
    const totalFeedback = calls.length;
    const averageRating = calls.reduce((sum, call) => sum + call.customerFeedback.rating, 0) / totalFeedback;
    const ratingDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    calls.forEach(call => {
      ratingDistribution[call.customerFeedback.rating]++;
    });

    return {
      totalFeedback,
      averageRating,
      ratingDistribution
    };
  }
}

interface FeedbackStats {
  totalFeedback: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}