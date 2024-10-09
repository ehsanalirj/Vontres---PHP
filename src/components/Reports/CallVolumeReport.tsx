import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Radio, Card } from 'antd';
import { Line } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCallVolumeReport } from '../../store/actions/reportActions';

const { RangePicker } = DatePicker;

const CallVolumeReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>('day');
  const dispatch = useDispatch();
  const report = useSelector((state: RootState) => state.reports.callVolume);

  const handleGenerateReport = () => {
    if (dateRange) {
      dispatch(fetchCallVolumeReport(dateRange[0].toDate(), dateRange[1].toDate(), groupBy));
    }
  };

  const config = {
    data: report,
    xField: 'date',
    yField: 'totalCalls',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v: string) => `${v} calls`,
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return (
    <div>
      <h2>Call Volume Report</h2>
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} style={{ marginRight: 8 }} />
        <Radio.Group value={groupBy} onChange={(e) => setGroupBy(e.target.value)} style={{ marginRight: 8 }}>
          <Radio.Button value="day">Day</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
        </Radio.Group>
        <Button onClick={handleGenerateReport} type="primary">
          Generate Report
        </Button>
      </div>
      <Card>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default CallVolumeReport;