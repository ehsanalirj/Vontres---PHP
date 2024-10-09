import express from 'express';
import authRoutes from './authRoutes';
import companyRoutes from './companyRoutes';
import contactRoutes from './contactRoutes';
import callRoutes from './callRoutes';
import { authenticateAPIKey } from '../../../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateAPIKey);

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/contacts', contactRoutes);
router.use('/calls', callRoutes);

export default router;