import { sendEmail } from './EmailService';
import { getSystemMetrics } from './MetricsService';

export const checkSystemHealth = async () => {
  const metrics = await getSystemMetrics();
  
  if (metrics.cpuUsage > 90 || metrics.memoryUsage > 90) {
    await sendAlertToAdmin('High resource usage detected', JSON.stringify(metrics, null, 2));
  }

  if (metrics.errorRate > 5) {
    await sendAlertToAdmin('High error rate detected', JSON.stringify(metrics, null, 2));
  }

  // Add more health checks as needed
};

const sendAlertToAdmin = async (subject: string, message: string) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  await sendEmail(adminEmail, subject, message);
};