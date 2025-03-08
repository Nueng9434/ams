import { create } from 'zustand';
import { User, LoginCredentials } from '@/types/auth';
import { loginUser, logoutUser, getProfile } from '@/services/api';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  sessionId: number | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  initialize: () => Promise<void>;
  updateActivity: () => void;
  checkSessionTimeout: () => boolean;
  verifySession: () => Promise<boolean>;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const LAST_ACTIVITY_KEY = 'lastActivityTime';
const USER_DATA_KEY = 'userData';
const SESSION_ID_KEY = 'sessionId';

const getStoredLastActivity = (): number | null => {
  const stored = localStorage.getItem(LAST_ACTIVITY_KEY);
  return stored ? parseInt(stored, 10) : null;
};

const getStoredUserData = (): User | null => {
  const stored = localStorage.getItem(USER_DATA_KEY);
  return stored ? JSON.parse(stored) : null;
};

const getStoredSessionId = (): number | null => {
  const stored = localStorage.getItem(SESSION_ID_KEY);
  return stored ? parseInt(stored, 10) : null;
};

const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  sessionId: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await loginUser(credentials);
      
      // Store token and session data
      Cookies.set('token', response.data.token, { expires: 1 });
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
      localStorage.setItem(SESSION_ID_KEY, response.data.sessionId.toString());
      
      set({
        user: response.data.user,
        sessionId: response.data.sessionId,
        isLoading: false,
      });

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during login',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      // Clear all stored data even if API call fails
      Cookies.remove('token');
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
      set({ user: null, sessionId: null, error: null });
    }
  },

  updateActivity: () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  },

  checkSessionTimeout: () => {
    const lastActivity = getStoredLastActivity();
    const { logout } = get();
    
    if (!lastActivity) return false;

    const isTimedOut = Date.now() - lastActivity > SESSION_TIMEOUT;
    if (isTimedOut) {
      logout();
      return true;
    }
    return false;
  },

  verifySession: async () => {
    try {
      await getProfile();
      return true;
    } catch (error) {
      const { logout } = get();
      await logout();
      return false;
    }
  },

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getProfile();
      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred fetching profile',
        isLoading: false,
      });
      throw error;
    }
  },

  initialize: async () => {
    const token = Cookies.get('token');
    if (token) {
      const storedUser = getStoredUserData();
      const storedSessionId = getStoredSessionId();
      if (storedUser && storedSessionId) {
        set({ 
          user: storedUser,
          sessionId: storedSessionId
        });
        localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
      } else {
        // Only fetch profile if we have token but no stored data
        try {
          const response = await getProfile();
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
          localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
          set({ user: response.data.user });
        } catch (error) {
          await get().logout();
        }
      }
    }
  },
}));

export default useAuth;
