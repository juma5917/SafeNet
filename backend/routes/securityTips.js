const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const securityTipController = require('../controllers/securityTipController');

const router = express.Router();

router.get('/', securityTipController.getSecurityTips);
router.get('/:id', securityTipController.getSecurityTipById);
router.post('/', authenticate, authorize(['educator', 'admin']), securityTipController.createSecurityTip);

module.exports = router;
