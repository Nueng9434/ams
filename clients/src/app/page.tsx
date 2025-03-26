'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already authenticated
    if (authService.isAuthenticated()) {
      // Redirect to dashboard if already logged in
      router.push('/dashboard');
    } else {
      // Redirect to login if not logged in
      router.push('/login');
    }
  }, [router]);

  // Show a simple loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Apartment Management System</h1>
        <p className="mt-4">Redirecting...</p>
      </div>
    </div>
  );
}
