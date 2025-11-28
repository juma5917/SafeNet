const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['safety_tips', 'privacy_guide', 'mental_health', 'legal_info', 'support_services', 'parent_guide', 'educator_guide'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: false
  },
  resource_type: {
    type: String,
    enum: ['article', 'video', 'infographic', 'podcast', 'tool'],
    default: 'article'
  },
  difficulty_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimated_time: {
    type: Number,
    required: false // in minutes
  },
  views: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
