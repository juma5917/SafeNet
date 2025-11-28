const mongoose = require('mongoose');

const supportResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['helpline', 'counseling', 'legal_aid', 'shelter', 'online_support'],
    required: true
  },
  contact_info: {
    phone: String,
    email: String,
    website: String,
    address: String
  },
  availability: {
    type: String,
    enum: ['24/7', 'business_hours', 'scheduled'],
    default: '24/7'
  },
  languages: [String],
  serving_regions: [String],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SupportResource', supportResourceSchema);
