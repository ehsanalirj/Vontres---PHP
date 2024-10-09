import cron from 'node-cron';
import { generateDailyReports } from '../services/ReportingService';
import { cleanupOldData } from '../services/DataCleanupService';
import { checkSystemHealth } from '../services/SystemHealthService';

export const setupCronJobs = () => {
  // Generate daily reports at 1:00 AM every day
  cron.schedule('0 1 * * *', async () => {
    console.log('Generating daily reports...');
    await generateDailyReports();
  });

  // Clean up old data at 2:00 AM every Sunday
  cron.schedule('0 2 * * 0', async () => {
    console.log('Cleaning up old data...');
    await cleanupOldData();
  });

  // Check system health every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    console.log('Checking system health...');
    await checkSystemHealth();
  });
};