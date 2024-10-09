import User from '../models/User';
import Call from '../models/Call';

export class GamificationService {
  async updateAgentScore(agentId: string, callId: string): Promise<void> {
    const call = await Call.findById(callId);
    const agent = await User.findById(agentId);

    if (!call || !agent) {
      throw new Error('Call or Agent not found');
    }

    let pointsEarned = 0;

    // Calculate points based on call metrics
    if (call.duration < 300) pointsEarned += 10; // Short call bonus
    if (call.customerSatisfaction > 4) pointsEarned += 20; // High satisfaction bonus
    if (call.resolved) pointsEarned += 15; // Resolution bonus

    // Update agent's score and level
    agent.score += pointsEarned;
    agent.level = Math.floor(agent.score / 100) + 1; // Level up every 100 points

    await agent.save();

    // Check for achievements
    await this.checkAchievements(agent);
  }

  private async checkAchievements(agent: any): Promise<void> {
    const totalCalls = await Call.countDocuments({ agentId: agent._id });
    const highSatisfactionCalls = await Call.countDocuments({ agentId: agent._id, customerSatisfaction: { $gt: 4 } });

    if (totalCalls >= 100 && !agent.achievements.includes('Century')) {
      agent.achievements.push('Century');
    }

    if (highSatisfactionCalls >= 50 && !agent.achievements.includes('Customer Favorite')) {
      agent.achievements.push('Customer Favorite');
    }

    // Add more achievement checks as needed

    await agent.save();
  }

  async getLeaderboard(): Promise<any[]> {
    return User.find({ role: 'agent' })
      .sort({ score: -1 })
      .limit(10)
      .select('name score level achievements');
  }
}