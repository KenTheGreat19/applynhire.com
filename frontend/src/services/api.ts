import axios from 'axios';
import type { 
  Job, 
  JobListItem, 
  PaginatedResponse, 
  JobSearchParams,
  AuthResponse,
  User,
  JobApplication,
  SavedJob
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
const AUTH_URL = import.meta.env.VITE_AUTH_URL || '/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Jobs API
export const jobsApi = {
  // Get paginated job listings
  getJobs: async (params: JobSearchParams = {}): Promise<PaginatedResponse<JobListItem>> => {
    const response = await api.get('/jobs/', { params });
    return response.data;
  },

  // Get single job details
  getJob: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}/`);
    return response.data;
  },

  // Get featured jobs
  getFeaturedJobs: async (limit: number = 10): Promise<JobListItem[]> => {
    const response = await api.get('/jobs/featured/', { params: { limit } });
    return response.data;
  },

  // Get job categories
  getCategories: async (): Promise<{ name: string; count: number }[]> => {
    const response = await api.get('/jobs/categories/');
    return response.data;
  },

  // Apply to a job
  applyToJob: async (jobId: string, data: { cover_letter?: string; resume_url?: string }): Promise<JobApplication> => {
    const response = await api.post(`/jobs/${jobId}/apply/`, data);
    return response.data;
  },

  // Save/unsave a job
  toggleSaveJob: async (jobId: string, notes?: string): Promise<SavedJob | { message: string }> => {
    const response = await api.post(`/jobs/${jobId}/save/`, { notes });
    return response.data;
  },

  // Get user's applications
  getUserApplications: async (): Promise<JobApplication[]> => {
    const response = await api.get('/jobs/user/applications/');
    return response.data;
  },

  // Get user's saved jobs
  getUserSavedJobs: async (): Promise<SavedJob[]> => {
    const response = await api.get('/jobs/user/saved/');
    return response.data;
  },
};

// Auth API
export const authApi_service = {
  // Register new user
  register: async (data: {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
    role: 'employer' | 'applicant';
  }): Promise<AuthResponse> => {
    const response = await authApi.post('/register/', data);
    return response.data;
  },

  // Login user
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await authApi.post('/login/', data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await authApi.post('/logout/');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await authApi.get('/me/');
    return response.data;
  },

  // Update current user
  updateCurrentUser: async (data: Partial<User>): Promise<User> => {
    const response = await authApi.patch('/me/', data);
    return response.data;
  },
};

export default api;
