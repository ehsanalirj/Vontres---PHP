import { setupCronJobs } from '../server/cron';
import { checkSystemHealth } from '../server/services/SystemHealthService';

async function testCronAndHealth() {
  console.log('Setting up cron jobs...');
  setupCronJobs();

  console.log('Testing system health check...');
  await checkSystemHealth();

  // Simulate high CPU usage
  console.log('Simulating high CPU usage...');
  process.cpuUsage({ user: 900000000, system: 900000000 });

  console.log('Running system health check again...');
  await checkSystemHealth();

  console.log('Cron and health check tests completed');
}

testCronAndHealth();