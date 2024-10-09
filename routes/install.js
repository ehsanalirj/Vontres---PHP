const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to VONTRES AI installation' });
});

router.post('/check-requirements', (req, res) => {
  const requirements = {
    nodeVersion: process.version,
    mongodbConnected: mongoose.connection.readyState === 1,
    writableEnvFile: fs.accessSync('.env', fs.constants.W_OK),
  };
  res.json(requirements);
});

router.post('/database-setup', async (req, res) => {
  const { mongoUri } = req.body;
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Update .env file with MONGO_URI
    const envContent = `MONGO_URI=${mongoUri}\n`;
    fs.writeFileSync('.env', envContent, { flag: 'a' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-admin', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/finalize', (req, res) => {
  // Set an installation flag in .env or a separate file
  fs.writeFileSync('.env', 'INSTALLED=true\n', { flag: 'a' });
  res.json({ success: true, message: 'Installation completed' });
});

module.exports = router;