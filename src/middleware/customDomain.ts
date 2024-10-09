import { Request, Response, NextFunction } from 'express';
import Company from '../models/Company';

export const customDomainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const host = req.get('host');
  const company = await Company.findOne({ customDomain: host });

  if (company) {
    req.company = company;
  }

  next();
};