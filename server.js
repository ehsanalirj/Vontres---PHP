const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const path = require('path');
const jwt = require('jsonwebtoken');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Check if the application is installed
const isInstalled = () => {
  // Check if .env file exists and has necessary configurations
  return false; // Change this to actually check for installation
};

// Installation routes
app.use('/install', require('./routes/install'));

// Main application routes
if (isInstalled()) {
  const authRoutes = require('./routes/auth');
  const companyRoutes = require('./routes/company');
  const agentRoutes = require('./routes/agent');
  const callRoutes = require('./routes/call');

  app.use('/api/auth', authRoutes);
  app.use('/api/company', authenticateToken, companyRoutes);
  app.use('/api/agent', authenticateToken, agentRoutes);
  app.use('/api/call', authenticateToken, callRoutes);
} else {
  // Redirect all routes to installation if not installed
  app.use('*', (req, res) => {
    res.redirect('/install');
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));