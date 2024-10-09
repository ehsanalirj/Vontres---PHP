const mongoose = require('mongoose');
const User = require('../src/models/User');
const Company = require('../src/models/Company');
const Call = require('../src/models/Call');

async function migrateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Migrate users
    const users = await User.find({});
    for (const user of users) {
      // Perform any necessary data transformations
      user.newField = 'Some default value';
      await user.save();
    }

    // Migrate companies
    const companies = await Company.find({});
    for (const company of companies) {
      // Perform any necessary data transformations
      company.newCompanyField = 'Some default company value';
      await company.save();
    }

    // Migrate calls
    const calls = await Call.find({});
    for (const call of calls) {
      // Perform any necessary data transformations
      call.newCallField = 'Some default call value';
      await call.save();
    }

    console.log('Data migration completed successfully');
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateData();