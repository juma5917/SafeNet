const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  incident_type: {
    type: String,
    enum: ['cyberbullying', 'harassment', 'hate_speech', 'scam', 'phishing', 'malware', 'impersonation', 'non_consensual_content', 'other'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  description: {
    type: String,
    required: true
  },
  evidence_url: {
    type: String,
    required: false
  },
  platform: {
    type: String,
    enum: ['twitter', 'facebook', 'instagram', 'tiktok', 'youtube', 'email', 'sms', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['reported', 'under_review', 'resolved', 'dismissed'],
    default: 'reported'
  },
  is_anonymous: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Report', reportSchema);
