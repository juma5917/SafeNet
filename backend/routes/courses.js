const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', authenticate, authorize(['educator', 'admin']), courseController.createCourse);
router.post('/:id/enroll', authenticate, courseController.enrollCourse);
router.post('/:id/lessons/:lesson_id/complete', authenticate, courseController.completeLesson);
router.get('/user/progress', authenticate, courseController.getUserProgress);

module.exports = router;
