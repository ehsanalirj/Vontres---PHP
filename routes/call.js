const express = require('express');
const router = express.Router();
const { getCalls, getCallById, createCall, updateCall, deleteCall } = require('../controllers/callController');
const { protect, agent } = require('../middleware/authMiddleware');

router.route('/').get(protect, agent, getCalls).post(protect, agent, createCall);
router.route('/:id').get(protect, agent, getCallById).put(protect, agent, updateCall).delete(protect, agent, deleteCall);

module.exports = router;