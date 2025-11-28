const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completed_lessons: [{
    lesson_number: Number,
    completed_at: Date,
    quiz_score: Number
  }],
  overall_progress: {
    type: Number,
    default: 0
  },
  certificate_earned: {
    type: Boolean,
    default: false
  },
  certificate_date: {
    type: Date,
    required: false
  },
  enrolled_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
