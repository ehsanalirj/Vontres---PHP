import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import companyRoutes from './companyRoutes';
import contactRoutes from './contactRoutes';
import callRoutes from './callRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/contacts', contactRoutes);
router.use('/calls', callRoutes);

export default router;