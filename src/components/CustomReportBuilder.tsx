import React, { useState } from 'react';
import { Form, Select, DatePicker, Button } from 'antd';
import { Bar, Line, Pie } from '@ant-design/charts';
import { ReportingService } from '../services/ReportingService';

const { RangePicker } = DatePicker;
const { Option } = Select;

const CustomReportBuilder: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const reportingService = new ReportingService();

  const onFinish = async (values: any) => {
    const { dateRange, metrics, groupBy } = values;
    const [startDate, endDate] = dateRange;

    const data = await reportingService.generateCustomReport({
      startDate,
      endDate,
      metrics,
      groupBy,
    });

    setReportData(data);
  };

  const renderChart = () => {
    if (!reportData) return null;

    const config = {
      data: reportData.datasets[0].data.map((value: number, index: number) => ({
        category: reportData.labels[index],
        value,
      })),
      xField: 'category',
      yField: 'value',
      seriesField: 'category',
    };

    switch (chartType) {
      case 'bar':
        return <Bar {...config} />;
      case 'line':
        return <Line {...config} />;
      case 'pie':
        return <Pie {...config} />;
    }
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="dateRange" label="Date Range" rules={[{ required: true }]}>
          <RangePicker />
        </Form.Item>
        <Form.Item name="metrics" label="Metrics" rules={[{ required: true }]}>
          <Select mode="multiple">
            <Option value="totalCalls">Total Calls</Option>
            <Option value="averageDuration">Average Duration</Option>
            <Option value="successRate">Success Rate</Option>
          </Select>
        </Form.Item>
        <Form.Item name="groupBy" label="Group By" rules={[{ required: true }]}>
          <Select>
            <Option value="agent">Agent</Option>
            <Option value="customer">Customer</Option>
            <Option value="date">Date</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Generate Report</Button>
        </Form.Item>
      </Form>

      {reportData && (
        <div>
          <Select value={chartType} onChange={setChartType} style={{ marginBottom: 16 }}>
            <Option value="bar">Bar Chart</Option>
            <Option value="line">Line Chart</Option>
            <Option value="pie">Pie Chart</Option>
          </Select>
          {renderChart()}
        </div>
      )}
    </div>
  );
};

export default CustomReportBuilder;