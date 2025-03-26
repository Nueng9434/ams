import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterData {
  username: string;
  password: string;
  role?: string;
}

export class AuthService {
  /**
   * Login with username and password
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      // Store token and user in localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      
      return response.data.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await api.post('/auth/register', data);
      return response.data.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      // First check if we have a user in localStorage
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        return null;
      }

      // We have a user, but let's verify they're still authenticated
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      // If there's an error, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  }

  /**
   * Logout the current user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Check if a user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get the current user from localStorage
   */
  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson);
  }

  /**
   * Check if current user has a specific role
   */
  hasRole(role: string | string[]): boolean {
    const user = this.getUser();
    if (!user) {
      return false;
    }

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  }
}

export default new AuthService();
