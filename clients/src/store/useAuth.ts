import { create } from 'zustand';
import { User, LoginCredentials } from '@/types/auth';
import { loginUser, getProfile } from '@/services/api';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  initialize: () => Promise<void>;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await loginUser(credentials);
      
      // Store token in cookie (expires in 1 day)
      Cookies.set('token', response.data.token, { expires: 1 });
      
      set({
        user: response.data.user,
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

  logout: () => {
    Cookies.remove('token');
    set({ user: null, error: null });
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
      try {
        const response = await getProfile();
        set({ user: response.data.user });
      } catch (error) {
        Cookies.remove('token');
        set({ user: null });
      }
    }
  },
}));

export default useAuth;
