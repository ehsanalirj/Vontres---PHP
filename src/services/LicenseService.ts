import License, { ILicense } from '../models/License';
import crypto from 'crypto';

export class LicenseService {
  static async generateLicense(email: string, companyName: string, expirationDate: Date): Promise<ILicense> {
    const license = new License({
      email,
      companyName,
      expirationDate
    });
    await license.save();
    return license;
  }

  static async validateLicense(key: string): Promise<boolean> {
    const license = await License.findOne({ key, isActive: true });
    if (!license) return false;
    return new Date() <= license.expirationDate;
  }

  static async generateMasterLicense(): Promise<ILicense> {
    const masterLicenseKey = this.generateMasterLicenseKey();
    const license = new License({
      key: masterLicenseKey,
      email: 'admin@yourdomain.com',
      companyName: 'System Admin',
      expirationDate: new Date(2099, 11, 31), // Far future date
      isMasterLicense: true
    });
    await license.save();
    return license;
  }

  private static generateMasterLicenseKey(): string {
    const secret = process.env.MASTER_LICENSE_SECRET || 'your-secret-master-key';
    return crypto.createHmac('sha256', secret).update('master-license').digest('hex');
  }

  static async validateMasterLicense(key: string): Promise<boolean> {
    const license = await License.findOne({ key, isMasterLicense: true });
    return !!license;
  }
}