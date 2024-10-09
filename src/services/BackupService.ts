import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export class BackupService {
  static async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.gz`;
    const backupPath = path.join(__dirname, '..', '..', 'backups', backupFileName);

    await new Promise((resolve, reject) => {
      exec(`mongodump --uri="${process.env.MONGODB_URI}" --gzip --archive=${backupPath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });

    return backupPath;
  }

  static async uploadBackupToS3(backupPath: string): Promise<void> {
    const fileContent = fs.readFileSync(backupPath);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: path.basename(backupPath),
      Body: fileContent
    };

    await s3.upload(params).promise();
  }

  static async performBackup(): Promise<void> {
    try {
      const backupPath = await this.createBackup();
      await this.uploadBackupToS3(backupPath);
      console.log(`Backup created and uploaded successfully: ${backupPath}`);
    } catch (error) {
      console.error('Backup failed:', error);
    }
  }

  static async restoreFromBackup(backupFileName: string): Promise<void> {
    const backupPath = path.join(__dirname, '..', '..', 'backups', backupFileName);

    await new Promise((resolve, reject) => {
      exec(`mongorestore --uri="${process.env.MONGODB_URI}" --gzip --archive=${backupPath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });

    console.log(`Restore completed from backup: ${backupFileName}`);
  }
}