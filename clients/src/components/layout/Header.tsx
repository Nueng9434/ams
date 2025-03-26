'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import authService from '@/services/auth.service';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user from local storage
    const localUser = authService.getUser();
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="text-xl font-bold">
                AMS System
              </Link>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                Welcome, <span className="font-medium">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
