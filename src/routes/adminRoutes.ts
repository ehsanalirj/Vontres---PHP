import express from 'express';
import { generateLicense } from '../controllers/AdminController';
import { adminAuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/generate-license', adminAuthMiddleware, generateLicense);

export default router;