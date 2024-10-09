import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export class DatabaseService {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  static async createIndexes(): Promise<void> {
    try {
      await mongoose.model('User').createIndexes();
      await mongoose.model('Call').createIndexes();
      await mongoose.model('Ticket').createIndexes();
      logger.info('Database indexes created successfully');
    } catch (error) {
      logger.error('Error creating database indexes:', error);
    }
  }
}