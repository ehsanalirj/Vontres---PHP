import { LicenseService } from '../src/services/LicenseService';

async function generateAndDisplayMasterLicense() {
  try {
    const masterLicense = await LicenseService.generateMasterLicense();
    console.log('Master License Key:', masterLicense.key);
    console.log('Please keep this key secure and use it for the initial installation.');
  } catch (error) {
    console.error('Error generating master license:', error);
  }
}

generateAndDisplayMasterLicense();