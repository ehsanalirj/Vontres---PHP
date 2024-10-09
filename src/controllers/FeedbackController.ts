import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { type, title, description, priority } = req.body;
    const feedback = new Feedback({
      user: req.user._id,
      type,
      title,
      description,
      priority
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email');
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

export const updateFeedbackStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback status updated', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback status', error });
  }
};