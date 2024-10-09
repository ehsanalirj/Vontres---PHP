import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgentPerformanceReport } from '../../store/actions/reportActions';

const { RangePicker } = DatePicker;

const AgentPerformanceReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const dispatch = useDispatch();
  const report = useSelector((state: RootState) => state.reports.agentPerformance);

  const columns = [
    { title: 'Agent Name', dataIndex: 'agentName', key: 'agentName' },
    { title: 'Total Calls', dataIndex: 'totalCalls', key: 'totalCalls' },
    { title: 'Avg Call Duration (min)', dataIndex: 'averageCallDuration', key: 'averageCallDuration', render: (value: number) => (value / 60).toFixed(2) },
    { title: 'Resolved Calls (%)', dataIndex: 'resolvedCallsPercentage', key: 'resolvedCallsPercentage', render: (value: number) => value.toFixed(2) + '%' },
    { title: 'Avg Rating', dataIndex: 'averageRating', key: 'averageRating', render: (value: number) => value.toFixed(2) },
  ];

  const handleGenerateReport = () => {
    if (dateRange) {
      dispatch(fetchAgentPerformanceReport(dateRange[0].toDate(), dateRange[1].toDate()));
    }
  };

  return (
    <div>
      <h2>Agent Performance Report</h2>
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Button onClick={handleGenerateReport} type="primary" style={{ marginLeft: 8 }}>
          Generate Report
        </Button>
      </div>
      <Table columns={columns} dataSource={report} rowKey="agentName" />
    </div>
  );
};

export default AgentPerformanceReport;