import express from 'express';
import { createDemoAccount, getDemoAccount } from '../controllers/demoController';

const router = express.Router();

router.post('/request', createDemoAccount);
router.get('/:id', getDemoAccount);

export default router;