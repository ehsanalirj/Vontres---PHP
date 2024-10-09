import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Company from '../models/Company';
import Role from '../models/Role';

async function createDemoAccounts() {
  // Connect to the database
  await mongoose.connect(process.env.MONGODB_URI as string);

  // Create demo company
  const demoCompany = new Company({
    name: 'Demo Company',
    website: 'https://democompany.com',
    customDomain: 'demo.vontres.ai',
    departments: ['Sales', 'Support', 'Marketing'],
    roles: [
      { name: 'Sales Agent', department: 'Sales' },
      { name: 'Support Agent', department: 'Support' },
      { name: 'Marketing Specialist', department: 'Marketing' },
    ],
    twilioNumbers: [
      { number: '+15551234567', department: 'Sales', type: 'outbound' },
      { number: '+15559876543', department: 'Support', type: 'inbound' },
      { number: '+15555555555', department: 'Marketing', type: 'hybrid' },
    ],
    openAISettings: {
      apiKey: 'demo-openai-api-key',
      useGPT4: true,
      maxTokens: 2000,
    },
    scripts: [
      { name: 'Sales Pitch', content: 'Hello, this is a demo sales pitch...' },
      { name: 'Support Greeting', content: 'Thank you for contacting our support team...' },
    ],
    emailSettings: {
      smtpHost: 'smtp.democompany.com',
      smtpPort: 587,
      smtpUsername: 'noreply@democompany.com',
      smtpPassword: 'demo-smtp-password',
      encryption: 'tls',
      fromEmail: 'noreply@democompany.com',
      fromName: 'Demo Company',
    },
    setupProgress: 100,
    skipWizard: true,
  });

  await demoCompany.save();

  // Create demo admin
  const adminRole = await Role.findOne({ name: 'Admin' });
  const adminPassword = await bcrypt.hash('adminpassword', 10);
  const demoAdmin = new User({
    name: 'Demo Admin',
    email: 'admin@vontres.ai',
    password: adminPassword,
    role: adminRole?._id,
  });

  await demoAdmin.save();

  // Create demo agent
  const agentRole = await Role.findOne({ name: 'Agent' });
  const agentPassword = await bcrypt.hash('agentpassword', 10);
  const demoAgent = new User({
    name: 'Demo Agent',
    email: 'agent@democompany.com',
    password: agentPassword,
    role: agentRole?._id,
    company: demoCompany._id,
  });

  await demoAgent.save();

  console.log('Demo accounts created successfully');
  mongoose.connection.close();
}

createDemoAccounts().catch(console.error);