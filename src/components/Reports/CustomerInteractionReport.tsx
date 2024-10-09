import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerInteractionReport } from '../../store/actions/reportActions';

const { RangePicker } = DatePicker;

const CustomerInteractionReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const dispatch = useDispatch();
  const report = useSelector((state: RootState) => state.reports.customerInteraction);

  const columns = [
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Total Interactions', dataIndex: 'totalInteractions', key: 'totalInteractions' },
    { title: 'Resolved Interactions', dataIndex: 'resolvedInteractions', key: 'resolvedInteractions' },
    { title: 'Unresolved Interactions', dataIndex: 'unresolvedInteractions', key: 'unresolvedInteractions' },
    { title: 'Last Interaction Date', dataIndex: 'lastInteractionDate', key: 'lastInteractionDate', render: (date: string) => new Date(date).toLocaleDateString() },
  ];

  const handleGenerateReport = () => {
    if (dateRange) {
      dispatch(fetchCustomerInteractionReport(dateRange[0].toDate(), dateRange[1].toDate()));
    }
  };

  return (
    <div>
      <h2>Customer Interaction Report</h2>
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Button onClick={handleGenerateReport} type="primary" style={{ marginLeft: 8 }}>
          Generate Report
        </Button>
      </div>
      <Table columns={columns} dataSource={report} rowKey="customerName" />
    </div>
  );
};

export default CustomerInteractionReport;