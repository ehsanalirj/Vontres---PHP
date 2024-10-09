import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PermissionService } from '../services/PermissionService';

interface PermissionGuardProps {
  requiredPermission: string;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ requiredPermission, children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    const checkPermission = async () => {
      if (currentUser) {
        const permitted = await PermissionService.hasPermission(currentUser.id, requiredPermission);
        setHasPermission(permitted);
      }
    };

    checkPermission();
  }, [currentUser, requiredPermission]);

  if (!hasPermission) {
    return <div>You don't have permission to access this feature.</div>;
  }

  return <>{children}</>;
};

export default PermissionGuard;