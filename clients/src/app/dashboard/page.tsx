'use client';

import { useEffect, useState } from 'react';
import authService, { User } from '@/services/auth.service';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user from localStorage (fast)
    const localUser = authService.getUser();
    if (localUser) {
      setUser(localUser);
    }

    // Verify with server (in background)
    authService.getCurrentUser().then(serverUser => {
      if (serverUser) {
        setUser(serverUser);
      }
    }).catch(error => {
      console.error('Error fetching user:', error);
    });
  }, []);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p>Loading user information...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-gray-600">User ID</p>
            <p className="font-medium">{user.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-medium">{user.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Access Level</h3>
          <p>You have <strong className="capitalize">{user.role}</strong> privileges in the system.</p>
          
          {user.role === 'admin' && (
            <div className="mt-4">
              <p className="text-green-700">
                As an administrator, you can manage all aspects of the system including users, 
                buildings, tenants, and financial transactions.
              </p>
            </div>
          )}
          
          {user.role === 'manager' && (
            <div className="mt-4">
              <p className="text-green-700">
                As a manager, you can manage buildings, tenants, and view financial transactions.
              </p>
            </div>
          )}
          
          {user.role === 'staff' && (
            <div className="mt-4">
              <p className="text-green-700">
                As a staff member, you can view and manage tenant information and basic property details.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
