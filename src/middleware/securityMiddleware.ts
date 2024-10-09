import { Request, Response, NextFunction } from 'express';
import { SecurityService } from '../services/SecurityService';

export const fingerprintMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.fingerprint = SecurityService.generateFingerprint(req);
  next();
};

export const encryptResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  res.json = function(body) {
    if (body && !body.error) {
      body = SecurityService.encrypt(JSON.stringify(body));
    }
    return originalJson.call(this, body);
  };
  next();
};