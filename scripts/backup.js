const { BackupService } = require('../src/services/BackupService');

async function runBackup() {
  try {
    await BackupService.performBackup();
    console.log('Backup completed successfully');
  } catch (error) {
    console.error('Error during backup:', error);
  }
}

runBackup();