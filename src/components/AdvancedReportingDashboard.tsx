import React, { useState } from 'react';
import { Tabs, DatePicker, Button, Table, Card, Row, Col } from 'antd';
import { Line, Bar, Pie } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportData } from '../store/actions/reportActions';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AdvancedReportingDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const dispatch = useDispatch();
  const reportData = useSelector((state: RootState) => state.reports.data);

  const handleGenerateReport = () => {
    if (dateRange) {
      dispatch(fetchReportData(dateRange[0].toDate(), dateRange[1].toDate()));
    }
  };

  const callVolumeConfig = {
    data: reportData.callVolume,
    xField: 'date',
    yField: 'calls',
    seriesField: 'type',
  };

  const agentPerformanceConfig = {
    data: reportData.agentPerformance,
    xField: 'agent',
    yField: 'score',
    seriesField: 'metric',
  };

  const customerSatisfactionConfig = {
    data: reportData.customerSatisfaction,
    angleField: 'value',
    colorField: 'type',
  };

  return (
    <div>
      <h2>Advanced Reporting Dashboard</h2>
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Button onClick={handleGenerateReport} type="primary" style={{ marginLeft: 8 }}>
          Generate Report
        </Button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Total Calls">
                <h3>{reportData.totalCalls}</h3>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Average Handle Time">
                <h3>{reportData.averageHandleTime}</h3>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Customer Satisfaction">
                <h3>{reportData.averageSatisfaction}%</h3>
              </Card>
            </Col>
          </Row>
          <Card title="Call Volume Trend" style={{ marginTop: 16 }}>
            <Line {...callVolumeConfig} />
          </Card>
        </TabPane>
        <TabPane tab="Agent Performance" key="2">
          <Bar {...agentPerformanceConfig} />
        </TabPane>
        <TabPane tab="Customer Satisfaction" key="3">
          <Pie {...customerSatisfactionConfig} />
        </TabPane>
        <TabPane tab="Detailed Reports" key="4">
          <Table columns={reportData.detailedColumns} dataSource={reportData.detailedData} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdvancedReportingDashboard;