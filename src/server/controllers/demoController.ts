import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DemoAccount } from '../models/DemoAccount';

export const createDemoAccount = async (req: Request, res: Response) => {
  try {
    const { companyName, name, email, phoneNumber, companySize } = req.body;
    
    const demoAccount = new DemoAccount({
      id: uuidv4(),
      companyName,
      name,
      email,
      phoneNumber,
      companySize,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    await demoAccount.save();

    // Here you would typically set up the sandbox environment

    res.status(201).json({ message: 'Demo account created', demoId: demoAccount.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating demo account', error });
  }
};

export const getDemoAccount = async (req: Request, res: Response) => {
  try {
    const demoAccount = await DemoAccount.findOne({ id: req.params.id });
    if (!demoAccount) {
      return res.status(404).json({ message: 'Demo account not found' });
    }
    res.json(demoAccount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching demo account', error });
  }
};