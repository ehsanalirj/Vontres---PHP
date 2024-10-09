import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/CompanyService';

export const checkFeatureAccess = (requiredFeature: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const companyId = req.user.companyId;
    const features = await CompanyService.getCompanyFeatures(companyId);

    if (features.includes(requiredFeature)) {
      next();
    } else {
      res.status(403).json({ message: 'Feature not available in your current plan' });
    }
  };
};