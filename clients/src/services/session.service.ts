import api from './api';

export interface Session {
  id: number;
  loginTime: string;
  logoutTime: string | null;
  ipAddress: string;
  userAgent: string;
  duration: number | 'Active';
  user: {
    username: string;
    email: string;
  };
}

export const sessionService = {
  async getSessions(params?: { startDate?: string; endDate?: string }) {
    const response = await api.get<Session[]>('/sessions', { params });
    return response.data;
  },
};
