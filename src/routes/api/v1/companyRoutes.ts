import express from 'express';
import { getCompanyDetails, updateCompanyDetails } from '../../../controllers/api/v1/CompanyController';

const router = express.Router();

router.get('/:id', getCompanyDetails);
router.put('/:id', updateCompanyDetails);

// Add more routes as needed

export default router;