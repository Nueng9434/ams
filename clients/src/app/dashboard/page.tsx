'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService, { User } from '@/services/auth.service';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          router.push('/login');
          return;
        }

        // Get user from localStorage (fast)
        const localUser = authService.getUser();
        if (localUser) {
          setUser(localUser);
        }

        // Verify with server (in background)
        const serverUser = await authService.getCurrentUser();
        if (!serverUser) {
          // If server says not authenticated, redirect to login
          router.push('/login');
          return;
        }

        setUser(serverUser);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">AMS Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                Welcome, <span className="font-medium">{user?.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Username</p>
                <p className="font-medium">{user?.username}</p>
              </div>
              <div>
                <p className="text-gray-600">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
              <div>
                <p className="text-gray-600">User ID</p>
                <p className="font-medium">{user?.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium">{user?.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Access Level</h3>
              <p>You have <strong className="capitalize">{user?.role}</strong> privileges in the system.</p>
              
              {user?.role === 'admin' && (
                <div className="mt-4">
                  <p className="text-green-700">
                    As an administrator, you can manage all aspects of the system including users, 
                    buildings, tenants, and financial transactions.
                  </p>
                </div>
              )}
              
              {user?.role === 'manager' && (
                <div className="mt-4">
                  <p className="text-green-700">
                    As a manager, you can manage buildings, tenants, and view financial transactions.
                  </p>
                </div>
              )}
              
              {user?.role === 'staff' && (
                <div className="mt-4">
                  <p className="text-green-700">
                    As a staff member, you can view and manage tenant information and basic property details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
