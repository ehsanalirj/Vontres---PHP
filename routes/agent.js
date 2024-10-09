const express = require('express');
const router = express.Router();
const { getAgents, getAgentById, createAgent, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect, company } = require('../middleware/authMiddleware');

router.route('/').get(protect, company, getAgents).post(protect, company, createAgent);
router.route('/:id').get(protect, company, getAgentById).put(protect, company, updateAgent).delete(protect, company, deleteAgent);

module.exports = router;