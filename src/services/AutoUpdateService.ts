import axios from 'axios';

export class AutoUpdateService {
  private currentVersion: string;
  private updateServerUrl: string;

  constructor(currentVersion: string, updateServerUrl: string) {
    this.currentVersion = currentVersion;
    this.updateServerUrl = updateServerUrl;
  }

  async checkForUpdates() {
    try {
      const response = await axios.get(`${this.updateServerUrl}/version`);
      const latestVersion = response.data.version;
      return this.compareVersions(this.currentVersion, latestVersion) < 0;
    } catch (error) {
      console.error('Failed to check for updates:', error);
      return false;
    }
  }

  async performUpdate() {
    try {
      const response = await axios.get(`${this.updateServerUrl}/update`);
      const updateScript = response.data.updateScript;
      // Execute update script
      eval(updateScript);
      return true;
    } catch (error) {
      console.error('Failed to perform update:', error);
      return false;
    }
  }

  private compareVersions(v1: string, v2: string) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;
      if (part1 < part2) return -1;
      if (part1 > part2) return 1;
    }
    return 0;
  }
}