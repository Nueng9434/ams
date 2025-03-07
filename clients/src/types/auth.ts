export interface User {
  id: number;
  username: string;
  name: string;
  email?: string;
  role: 'admin' | 'employee';
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ProfileResponse {
  status: string;
  data: {
    user: User;
  };
}
