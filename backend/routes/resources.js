const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const resourceController = require('../controllers/resourceController');

const router = express.Router();

router.get('/', resourceController.getResources);
router.get('/:id', resourceController.getResourceById);
router.post('/', authenticate, authorize(['educator', 'admin']), resourceController.createResource);
router.put('/:id', authenticate, authorize(['educator', 'admin']), resourceController.updateResource);
router.delete('/:id', authenticate, authorize(['educator', 'admin']), resourceController.deleteResource);

module.exports = router;
