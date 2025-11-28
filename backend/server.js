const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load backend-specific .env regardless of current working directory
require('dotenv').config({ path: __dirname + '/.env' });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const reportRoutes = require('./routes/reports');
const resourceRoutes = require('./routes/resources');
const courseRoutes = require('./routes/courses');
const supportRoutes = require('./routes/support');
const securityTipRoutes = require('./routes/securityTips');
const aiRoutes = require('./routes/ai');
const curriculumRoutes = require('./routes/curriculum');

const app = express();

// Middleware
// CORS: allow the configured frontend origin in production, but be permissive in development
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: frontendOrigin, credentials: true }));
} else {
  // In development allow any origin (useful when accessing via LAN IPs)
  app.use(cors({ origin: true, credentials: true }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safenet')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/security-tips', securityTipRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/curriculum', curriculumRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
