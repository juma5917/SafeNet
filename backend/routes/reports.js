const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.post('/', authenticate, reportController.createReport);
router.get('/user', authenticate, reportController.getReports);
router.get('/all', authenticate, authorize(['admin']), reportController.getAllReports);
router.put('/:id', authenticate, authorize(['admin']), reportController.updateReportStatus);
router.get('/stats', authenticate, authorize(['admin']), reportController.getReportStats);

module.exports = router;
