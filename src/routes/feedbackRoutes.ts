import express from 'express';
import { submitFeedback, getFeedback, updateFeedbackStatus } from '../controllers/FeedbackController';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateJWT, submitFeedback);
router.get('/', authenticateJWT, isAdmin, getFeedback);
router.patch('/:id', authenticateJWT, isAdmin, updateFeedbackStatus);

export default router;