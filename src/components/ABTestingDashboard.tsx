import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'antd';
import { ABTestingService } from '../services/ABTestingService';

const ABTestingDashboard: React.FC = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const abTestingService = new ABTestingService();

  useEffect(() => {
    // Fetch active A/B tests
    // This is a placeholder, you'd typically fetch this from your backend
    const fetchActiveTests = async () => {
      // const activeTests = await fetchActiveABTests();
      // setActiveTests(activeTests);
    };
    fetchActiveTests();
  }, []);

  const handleCreateTest = async (scriptId: string) => {
    await abTestingService.createABTest(scriptId);
    // Refresh active tests
  };

  const handleAnalyzeResults = async (scriptId: string) => {
    const results = await abTestingService.analyzeTestResults(scriptId);
    setTestResults(results);
  };

  const columns = [
    {
      title: 'Script Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Calls',
      dataIndex: ['metrics', 'totalCalls'],
      key: 'totalCalls',
    },
    {
      title: 'Success Rate',
      dataIndex: ['metrics', 'successRate'],
      key: 'successRate',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
    },
    {
      title: 'Avg Duration',
      dataIndex: ['metrics', 'averageDuration'],
      key: 'averageDuration',
      render: (value: number) => `${value.toFixed(2)} seconds`,
    },
  ];

  return (
    <div>
      <Card title="A/B Testing Dashboard">
        <Button onClick={() => handleCreateTest('someScriptId')}>Create New A/B Test</Button>
        <Button onClick={() => handleAnalyzeResults('someScriptId')}>Analyze Results</Button>
      </Card>
      {testResults && (
        <Card title="Test Results" style={{ marginTop: 16 }}>
          <Table
            dataSource={[
              { key: 'original', name: 'Original Script', ...testResults.originalScript },
              { key: 'variant', name: 'Variant Script', ...testResults.variantScript },
            ]}
            columns={columns}
          />
        </Card>
      )}
    </div>
  );
};

export default ABTestingDashboard;