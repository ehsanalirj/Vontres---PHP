import * as tf from '@tensorflow/tfjs';

export class LeadScoringService {
  private model: tf.LayersModel;

  constructor() {
    this.initModel();
  }

  private async initModel() {
    this.model = await tf.loadLayersModel('path/to/lead-scoring-model.json');
  }

  scoreLeads(leadData: any[]) {
    const tensorData = tf.tensor2d(leadData.map(lead => Object.values(lead)));
    const scores = this.model.predict(tensorData) as tf.Tensor;
    return scores.dataSync();
  }

  prioritizeLeads(leads: any[]) {
    const scores = this.scoreLeads(leads);
    return leads.map((lead, index) => ({ ...lead, score: scores[index] }))
      .sort((a, b) => b.score - a.score);
  }
}