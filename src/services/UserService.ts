import User, { IUser } from '../models/User';
import { cacheService } from './CacheService';

export class UserService {
  static async getUserById(id: string): Promise<IUser | null> {
    const cacheKey = `user:${id}`;
    const cachedUser = cacheService.get<IUser>(cacheKey);
    
    if (cachedUser) {
      return cachedUser;
    }

    const user = await User.findById(id).lean();
    
    if (user) {
      cacheService.set(cacheKey, user);
    }

    return user;
  }

  static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).lean();
    
    if (updatedUser) {
      cacheService.set(`user:${id}`, updatedUser);
    }

    return updatedUser;
  }

  // Add more optimized methods here
}