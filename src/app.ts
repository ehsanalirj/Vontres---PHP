import express from 'express';
import { SystemMonitoringService } from './services/SystemMonitoringService';
// ... other imports

const app = express();

// ... other middleware and configurations

// Start system monitoring
SystemMonitoringService.startMonitoring();

// ... routes and other configurations

export default app;