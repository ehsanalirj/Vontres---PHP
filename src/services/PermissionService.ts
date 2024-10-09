import Role from '../models/Role';
import User from '../models/User';

export class PermissionService {
  static async getUserPermissions(userId: string): Promise<string[]> {
    const user = await User.findById(userId).populate({
      path: 'role',
      populate: { path: 'permissions' }
    });

    if (!user || !user.role) {
      return [];
    }

    return user.role.permissions.map(permission => permission.name);
  }

  static async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permissionName);
  }
}