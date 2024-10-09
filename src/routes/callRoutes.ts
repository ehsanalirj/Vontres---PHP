import express from 'express';
import { initiateCall, endCall } from '../controllers/CallController';
import { checkFeatureAccess } from '../middleware/featureAccessMiddleware';

const router = express.Router();

router.post('/initiate', checkFeatureAccess('basic_calling'), initiateCall);
router.post('/end', checkFeatureAccess('basic_calling'), endCall);

export default router;