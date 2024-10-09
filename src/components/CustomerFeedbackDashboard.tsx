import React, { useState, useEffect } from 'react';
import { Card, Statistic, Progress } from 'antd';
import { CustomerFeedbackService } from '../services/CustomerFeedbackService';

const CustomerFeedbackDashboard: React.FC<{ agentId: string }> = ({ agentId }) => {
  const [feedbackStats, setFeedbackStats] = useState<any>(null);
  const customerFeedbackService = new CustomerFeedbackService();

  useEffect(() => {
    const fetchFeedbackStats = async () => {
      const stats = await customerFeedbackService.getFeedbackStats(agentId);
      setFeedbackStats(stats);
    };
    fetchFeedbackStats();
  }, [agentId]);

  if (!feedbackStats) return <div>Loading...</div>;

  return (
    <Card title="Customer Feedback Dashboard">
      <Statistic title="Average Rating" value={feedbackStats.averageRating.toFixed(2)} suffix="/ 5" />
      <Statistic title="Total Feedback" value={feedbackStats.totalFeedback} />
      <h3>Rating Distribution</h3>
      {Object.entries(feedbackStats.ratingDistribution).map(([rating, count]) => (
        <div key={rating}>
          <span>{rating} Star{Number(rating) !== 1 ? 's' : ''}: </span>
          <Progress
            percent={((count as number) / feedbackStats.totalFeedback) * 100}
            format={(percent) => `${count} (${percent?.toFixed(2)}%)`}
          />
        </div>
      ))}
    </Card>
  );
};

export default CustomerFeedbackDashboard;