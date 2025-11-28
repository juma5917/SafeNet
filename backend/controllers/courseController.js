const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, level, duration_hours, lessons } = req.body;

    const course = new Course({
      title,
      description,
      level,
      duration_hours,
      lessons,
      creator_id: req.user.id
    });

    await course.save();
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const { level } = req.query;
    let filter = {};
    if (level) filter.level = level;

    const courses = await Course.find(filter).populate('creator_id', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('creator_id', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    let progress = await UserProgress.findOne({ user_id: req.user.id, course_id: req.params.id });
    if (progress) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    progress = new UserProgress({
      user_id: req.user.id,
      course_id: req.params.id,
      completed_lessons: [],
      overall_progress: 0
    });

    await progress.save();
    res.status(201).json({ message: 'Enrolled successfully', progress });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.completeLesson = async (req, res) => {
  try {
    const { quiz_score } = req.body;
    const progress = await UserProgress.findOne({ user_id: req.user.id, course_id: req.params.id });

    if (!progress) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    const course = await Course.findById(req.params.id);
    const lesson_number = parseInt(req.params.lesson_id);

    // Add completed lesson
    progress.completed_lessons.push({
      lesson_number,
      completed_at: Date.now(),
      quiz_score: quiz_score || 0
    });

    // Update progress percentage
    progress.overall_progress = (progress.completed_lessons.length / course.lessons.length) * 100;

    // Check if course completed
    if (progress.completed_lessons.length === course.lessons.length) {
      progress.certificate_earned = true;
      progress.certificate_date = Date.now();
    }

    await progress.save();
    res.json({ message: 'Lesson completed', progress });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ user_id: req.user.id })
      .populate('course_id', 'title description level');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
