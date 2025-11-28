const mongoose = require('mongoose');

const securityTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['password_security', 'privacy', 'malware', 'phishing', 'social_engineering', 'data_protection'],
    required: true
  },
  tip: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['informational', 'important', 'critical'],
    default: 'important'
  },
  risk_level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SecurityTip', securityTipSchema);
