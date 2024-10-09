import Script from '../models/Script';
import Call from '../models/Call';

export class ABTestingService {
  async createABTest(originalScriptId: string): Promise<void> {
    const originalScript = await Script.findById(originalScriptId);
    if (!originalScript) {
      throw new Error('Original script not found');
    }

    const variantScript = new Script({
      ...originalScript.toObject(),
      _id: undefined,
      name: `${originalScript.name} (Variant)`,
      isVariant: true,
      originalScript: originalScript._id
    });

    await variantScript.save();
  }

  async assignScriptToCall(callId: string): Promise<string> {
    const call = await Call.findById(callId);
    if (!call) {
      throw new Error('Call not found');
    }

    const scripts = await Script.find({ isActive: true });
    const eligibleScripts = scripts.filter(script => !script.isVariant || script.originalScript);

    // Randomly select a script
    const selectedScript = eligibleScripts[Math.floor(Math.random() * eligibleScripts.length)];

    call.script = selectedScript._id;
    await call.save();

    return selectedScript._id;
  }

  async analyzeTestResults(originalScriptId: string): Promise<ABTestResult> {
    const originalScript = await Script.findById(originalScriptId);
    const variantScript = await Script.findOne({ originalScript: originalScriptId });

    if (!originalScript || !variantScript) {
      throw new Error('Scripts not found');
    }

    const originalCalls = await Call.find({ script: originalScriptId });
    const variantCalls = await Call.find({ script: variantScript._id });

    const originalMetrics = this.calculateMetrics(originalCalls);
    const variantMetrics = this.calculateMetrics(variantCalls);

    return {
      originalScript: { id: originalScriptId, metrics: originalMetrics },
      variantScript: { id: variantScript._id, metrics: variantMetrics }
    };
  }

  private calculateMetrics(calls: any[]): ScriptMetrics {
    const totalCalls = calls.length;
    const successfulCalls = calls.filter(call => call.outcome === 'successful').length;
    const averageDuration = calls.reduce((sum, call) => sum + call.duration, 0) / totalCalls;

    return {
      totalCalls,
      successRate: successfulCalls / totalCalls,
      averageDuration
    };
  }
}

interface ScriptMetrics {
  totalCalls: number;
  successRate: number;
  averageDuration: number;
}

interface ABTestResult {
  originalScript: { id: string; metrics: ScriptMetrics };
  variantScript: { id: string; metrics: ScriptMetrics };
}