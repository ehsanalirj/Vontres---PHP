import { Gauge, Registry } from 'prom-client';
import nodemailer from 'nodemailer';

class MonitoringService {
  private registry: Registry;
  private cpuUsageGauge: Gauge<string>;
  private memoryUsageGauge: Gauge<string>;
  private activeConnectionsGauge: Gauge<string>;

  constructor() {
    this.registry = new Registry();

    this.cpuUsageGauge = new Gauge({
      name: 'cpu_usage',
      help: 'CPU usage percentage',
      registers: [this.registry]
    });

    this.memoryUsageGauge = new Gauge({
      name: 'memory_usage',
      help: 'Memory usage in bytes',
      registers: [this.registry]
    });

    this.activeConnectionsGauge = new Gauge({
      name: 'active_connections',
      help: 'Number of active connections',
      registers: [this.registry]
    });
  }

  updateMetrics(cpuUsage: number, memoryUsage: number, activeConnections: number) {
    this.cpuUsageGauge.set(cpuUsage);
    this.memoryUsageGauge.set(memoryUsage);
    this.activeConnectionsGauge.set(activeConnections);
  }

  async sendAlert(subject: string, message: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.ALERT_FROM_EMAIL,
      to: process.env.ALERT_TO_EMAIL,
      subject,
      text: message
    });
  }

  getMetrics() {
    return this.registry.metrics();
  }
}

export const monitoringService = new MonitoringService();