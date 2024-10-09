import crypto from 'crypto';
import { Request } from 'express';

export class SecurityService {
  private static readonly ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-encryption-key';
  private static readonly IV_LENGTH = 16;

  static encrypt(text: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  static generateFingerprint(req: Request): string {
    const data = `${req.ip}|${req.headers['user-agent']}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}