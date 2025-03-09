'use client'

import { useEffect, useCallback, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '@/store/useAuth'

const ACTIVITY_UPDATE_INTERVAL = 5 * 60 * 1000; // Update activity every 5 minutes
const SESSION_VERIFY_INTERVAL = 15 * 60 * 1000; // Verify session every 15 minutes

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { initialize, updateActivity, checkSessionTimeout, verifySession, logout, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const lastActivityUpdate = useRef<number>(Date.now())
  const lastSessionVerify = useRef<number>(Date.now())

  // Debounced activity handler
  const handleActivity = useCallback(() => {
    if (!user) return;
    
    const now = Date.now();
    // Only update activity if enough time has passed
    if (now - lastActivityUpdate.current >= ACTIVITY_UPDATE_INTERVAL) {
      updateActivity();
      lastActivityUpdate.current = now;
    }
  }, [user, updateActivity]);

  // Session management
  useEffect(() => {
    if (!user || pathname === '/login') return;

    const checkSession = async () => {      
      try {
        // Check for timeout using local storage
        if (checkSessionTimeout()) {
          router.push('/login');
          return;
        }
      } catch (error) {
        // If any error occurs during session check, log out user
        await logout();
        router.push('/login');
      }
    };

    // Initial check
    checkSession();

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user, pathname, router, checkSessionTimeout, logout, verifySession]);

  // Initialize and setup activity listeners
  useEffect(() => {
    // Initialize if we don't have user data
    if (!user) {
      initialize();
    }

    let activityTimeout: NodeJS.Timeout;

    const handleUserActivity = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        if (user) {
          updateActivity();
        }
      }, 1000); // Debounce activity updates
    };

    // Add event listeners for essential user activity
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('mousemove', handleUserActivity);

    return () => {
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('mousemove', handleUserActivity);
    };
  }, [initialize, updateActivity, user]);

  return <>{children}</>;
}
