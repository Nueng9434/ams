import api from './api';
import { User } from '@/types/auth';

interface CreateUserData {
  username: string;
  name: string;
  email?: string;
  password: string;
  role: 'admin' | 'employee';
}

export const userService = {
  getUsers: async () => {
    const response = await api.get('/users/list');
    return response.data.data.users;
  },

  createUser: async (userData: CreateUserData) => {
    const response = await api.post('/users/create', userData);
    return response.data.data;
  },

  updateUser: async (userId: number, userData: Partial<User>) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data.data;
  },

  deleteUser: async (userId: number) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  toggleUserStatus: async (userId: number, isActive: boolean) => {
    const response = await api.put(`/users/${userId}`, { isActive });
    return response.data.data;
  },
};
