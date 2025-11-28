const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');

// GET /api/curriculum
router.get('/', curriculumController.getCurriculum);

module.exports = router;
