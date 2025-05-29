import axios, { AxiosError } from 'axios';
import { Application, ApplicationStats } from '../types/application';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && originalRequest) {
      // Clear invalid token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const auth = {
  register: async (data: { fullName: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },
};

export const applications = {
  getAll: async (): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>('/applications');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch applications');
      }
      throw error;
    }
  },
  create: async (data: Omit<Application, '_id'>): Promise<Application> => {
    try {
      const response = await api.post<Application>('/applications', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to create application');
      }
      throw error;
    }
  },
  update: async (id: string, data: Partial<Omit<Application, '_id'>>): Promise<Application> => {
    try {
      const response = await api.patch<Application>(`/applications/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update application');
      }
      throw error;
    }
  },
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/applications/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to delete application');
      }
      throw error;
    }
  },
  getStats: async (): Promise<ApplicationStats[]> => {
    try {
      const response = await api.get<ApplicationStats[]>('/applications/stats');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
      }
      throw error;
    }
  },
};

export default api; 