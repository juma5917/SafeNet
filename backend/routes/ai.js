const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/chat -> { message, language?, mode? }
router.post('/chat', aiController.chat);

// POST /api/ai/scan -> { text }
router.post('/scan', aiController.scan);

module.exports = router;
