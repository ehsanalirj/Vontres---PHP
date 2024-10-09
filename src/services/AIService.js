import axios from 'axios';

class AIService {
  async getCallSuggestions(callData) {
    try {
      const response = await axios.post('/api/ai/suggestions', callData);
      return response.data;
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      // Fallback to rule-based suggestions
      return this.getRuleBasedSuggestions(callData);
    }
  }

  getRuleBasedSuggestions(callData) {
    // Implement simple rule-based suggestions as a fallback
    const suggestions = [];
    if (callData.duration > 300) { // If call is longer than 5 minutes
      suggestions.push('Consider summarizing the conversation');
    }
    if (callData.sentiment < 0.3) { // If sentiment is negative
      suggestions.push('Offer additional support or escalate to a supervisor');
    }
    return suggestions;
  }
}

export default new AIService();