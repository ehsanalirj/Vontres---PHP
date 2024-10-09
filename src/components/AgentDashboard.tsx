import React, { useEffect, useState } from 'react';
import { Card, Progress, List, Badge } from 'antd';
import { GamificationService } from '../services/GamificationService';

const AgentDashboard: React.FC<{ agentId: string }> = ({ agentId }) => {
  const [agentData, setAgentData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const gamificationService = new GamificationService();

  useEffect(() => {
    const fetchData = async () => {
      const agent = await User.findById(agentId);
      setAgentData(agent);
      const leaderboardData = await gamificationService.getLeaderboard();
      setLeaderboard(leaderboardData);
    };
    fetchData();
  }, [agentId]);

  if (!agentData) return <div>Loading...</div>;

  return (
    <div>
      <Card title="Your Performance">
        <Progress
          type="circle"
          percent={agentData.score % 100}
          format={() => `Level ${agentData.level}`}
        />
        <p>Total Score: {agentData.score}</p>
        <h3>Achievements</h3>
        <List
          dataSource={agentData.achievements}
          renderItem={(item: string) => (
            <List.Item>
              <Badge status="success" text={item} />
            </List.Item>
          )}
        />
      </Card>
      <Card title="Leaderboard" style={{ marginTop: 16 }}>
        <List
          dataSource={leaderboard}
          renderItem={(item: any, index: number) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge count={index + 1} style={{ backgroundColor: index < 3 ? '#52c41a' : '#1890ff' }} />}
                title={item.name}
                description={`Score: ${item.score} | Level: ${item.level}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default AgentDashboard;