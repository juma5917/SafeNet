const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration_hours: {
    type: Number,
    required: true
  },
  lessons: [{
    lesson_number: Number,
    title: String,
    content: String,
    quiz_questions: [{
      question: String,
      options: [String],
      correct_answer: Number
    }]
  }],
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
