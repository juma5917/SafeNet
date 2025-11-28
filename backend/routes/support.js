const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const supportController = require('../controllers/supportController');

const router = express.Router();

router.get('/', supportController.getSupportResources);
router.get('/:id', supportController.getSupportResourceById);
router.post('/', authenticate, authorize(['admin']), supportController.createSupportResource);

module.exports = router;
