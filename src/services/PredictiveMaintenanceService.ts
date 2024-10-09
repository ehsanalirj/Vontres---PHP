import * as tf from '@tensorflow/tfjs';
import SystemMetrics from '../models/SystemMetrics';

export class PredictiveMaintenanceService {
  private static model: tf.LayersModel;

  static async initialize() {
    // Load or create the model
    try {
      this.model = await tf.loadLayersModel('file://./models/predictive_maintenance_model/model.json');
    } catch {
      this.model = this.createModel();
      await this.trainModel();
    }
  }

  private static createModel(): tf.LayersModel {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    return model;
  }

  private static async trainModel() {
    const metrics = await SystemMetrics.find().sort({ timestamp: -1 }).limit(10000);
    const inputData = metrics.map(m => [
      m.cpuUsage, m.memoryUsage, m.diskUsage, m.networkTraffic,
      m.activeUsers, m.responseTime, m.errorRate, m.queueLength,
      m.databaseConnections, m.cacheHitRate
    ]);
    const labels = metrics.map(m => m.hadIssue ? 1 : 0);

    const xs = tf.tensor2d(inputData);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await this.model.fit(xs, ys, {
      epochs: 100,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
        }
      }
    });

    await this.model.save('file://./models/predictive_maintenance_model');
  }

  static async predictIssue(metrics: number[]): Promise<number> {
    const input = tf.tensor2d([metrics]);
    const prediction = this.model.predict(input) as tf.Tensor;
    const probability = prediction.dataSync()[0];
    return probability;
  }
}