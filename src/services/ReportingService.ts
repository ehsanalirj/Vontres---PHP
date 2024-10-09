import { Call, Agent, Customer } from '../models/index';

export class ReportingService {
  async generateCustomReport(params: ReportParams): Promise<ReportData> {
    const { startDate, endDate, metrics, groupBy } = params;
    let data: any[] = [];

    switch (groupBy) {
      case 'agent':
        data = await this.getAgentData(startDate, endDate, metrics);
        break;
      case 'customer':
        data = await this.getCustomerData(startDate, endDate, metrics);
        break;
      case 'date':
        data = await this.getDateData(startDate, endDate, metrics);
        break;
      // Add more grouping options as needed
    }

    return this.formatReportData(data, metrics);
  }

  private async getAgentData(startDate: Date, endDate: Date, metrics: string[]): Promise<any[]> {
    // Implement logic to fetch and aggregate data by agent
    return Agent.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $lookup: { from: 'calls', localField: '_id', foreignField: 'agentId', as: 'calls' } },
      { $project: this.buildProjection(metrics) }
    ]);
  }

  private async getCustomerData(startDate: Date, endDate: Date, metrics: string[]): Promise<any[]> {
    // Implement logic to fetch and aggregate data by customer
    return Customer.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $lookup: { from: 'calls', localField: '_id', foreignField: 'customerId', as: 'calls' } },
      { $project: this.buildProjection(metrics) }
    ]);
  }

  private async getDateData(startDate: Date, endDate: Date, metrics: string[]): Promise<any[]> {
    // Implement logic to fetch and aggregate data by date
    return Call.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, ...this.buildGrouping(metrics) } },
      { $project: this.buildProjection(metrics) }
    ]);
  }

  private buildProjection(metrics: string[]): any {
    // Build the projection object based on selected metrics
    const projection: any = { _id: 1 };
    metrics.forEach(metric => {
      projection[metric] = 1;
    });
    return projection;
  }

  private buildGrouping(metrics: string[]): any {
    // Build the grouping object based on selected metrics
    const grouping: any = {};
    metrics.forEach(metric => {
      switch (metric) {
        case 'totalCalls':
          grouping.totalCalls = { $sum: 1 };
          break;
        case 'averageDuration':
          grouping.totalDuration = { $sum: '$duration' };
          grouping.callCount = { $sum: 1 };
          break;
        // Add more metric calculations as needed
      }
    });
    return grouping;
  }

  private formatReportData(data: any[], metrics: string[]): ReportData {
    // Format the aggregated data into a structure suitable for frontend visualization
    return {
      labels: data.map(item => item._id),
      datasets: metrics.map(metric => ({
        label: metric,
        data: data.map(item => item[metric])
      }))
    };
  }
}

interface ReportParams {
  startDate: Date;
  endDate: Date;
  metrics: string[];
  groupBy: 'agent' | 'customer' | 'date';
}

interface ReportData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}