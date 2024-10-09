import { Request, Response } from 'express';
import { LicenseService } from '../services/LicenseService';

export const generateLicense = async (req: Request, res: Response) => {
  try {
    const { email, companyName, expirationDate } = req.body;
    const license = await LicenseService.generateLicense(email, companyName, new Date(expirationDate));
    res.status(201).json({ message: 'License generated successfully', license });
  } catch (error) {
    res.status(500).json({ message: 'Error generating license', error });
  }
};