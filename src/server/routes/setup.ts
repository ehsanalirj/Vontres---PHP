import express from 'express';
import { 
  saveCompanyDetails, 
  verifyTwilioSettings, 
  verifyOpenAISettings, 
  saveEmailSettings 
} from '../controllers/setupController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/company-details', authenticateJWT, saveCompanyDetails);
router.post('/verify-twilio', authenticateJWT, verifyTwilioSettings);
router.post('/verify-openai', authenticateJWT, verifyOpenAISettings);
router.post('/email-settings', authenticateJWT, saveEmailSettings);

export default router;