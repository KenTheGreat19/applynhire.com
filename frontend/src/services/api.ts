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
import { getMockJobsResponse, getJobById, getFeaturedJobs, mockCategories } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
const AUTH_URL = import.meta.env.VITE_AUTH_URL || '/api/auth';

// Check if we're in demo mode (no backend available)
const isDemoMode = !import.meta.env.VITE_API_URL || import.meta.env.VITE_DEMO_MODE === 'true';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
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

// Jobs API with mock data fallback
export const jobsApi = {
  // Get paginated job listings
  getJobs: async (params: JobSearchParams = {}): Promise<PaginatedResponse<JobListItem>> => {
    if (isDemoMode) {
      // Return mock data in demo mode
      return getMockJobsResponse({
        search: params.search,
        job_type: params.job_type,
        location: params.location,
        remote: params.is_remote,
        page: params.page,
        page_size: params.page_size,
      });
    }
    try {
      const response = await api.get('/jobs/', { params });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return getMockJobsResponse({
        search: params.search,
        job_type: params.job_type,
        location: params.location,
        remote: params.is_remote,
        page: params.page,
        page_size: params.page_size,
      });
    }
  },

  // Get single job details
  getJob: async (id: string): Promise<Job> => {
    if (isDemoMode) {
      const job = getJobById(id);
      if (!job) throw new Error('Job not found');
      return job;
    }
    try {
      const response = await api.get(`/jobs/${id}/`);
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data');
      const job = getJobById(id);
      if (!job) throw new Error('Job not found');
      return job;
    }
  },

  // Get featured jobs
  getFeaturedJobs: async (limit: number = 10): Promise<JobListItem[]> => {
    if (isDemoMode) {
      return getFeaturedJobs(limit);
    }
    try {
      const response = await api.get('/jobs/featured/', { params: { limit } });
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return getFeaturedJobs(limit);
    }
  },

  // Get job categories
  getCategories: async (): Promise<{ name: string; count: number }[]> => {
    if (isDemoMode) {
      return mockCategories;
    }
    try {
      const response = await api.get('/jobs/categories/');
      return response.data;
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return mockCategories;
    }
  },

  // Apply to a job (requires backend)
  applyToJob: async (jobId: string, data: { cover_letter?: string; resume_url?: string }): Promise<JobApplication> => {
    if (isDemoMode) {
      // Return a mock successful application in demo mode
      return {
        id: `app-${Date.now()}`,
        job_id: jobId,
        cover_letter: data.cover_letter,
        status: 'applied',
        applied_at: new Date().toISOString(),
      } as JobApplication;
    }
    const response = await api.post(`/jobs/${jobId}/apply/`, data);
    return response.data;
  },

  // Save/unsave a job (requires backend)
  toggleSaveJob: async (jobId: string, notes?: string): Promise<SavedJob | { message: string }> => {
    if (isDemoMode) {
      return { message: 'Job saved (demo mode)' };
    }
    const response = await api.post(`/jobs/${jobId}/save/`, { notes });
    return response.data;
  },

  // Get user's applications (requires backend)
  getUserApplications: async (): Promise<JobApplication[]> => {
    if (isDemoMode) {
      return []; // Empty in demo mode
    }
    const response = await api.get('/jobs/user/applications/');
    return response.data;
  },

  // Get user's saved jobs (requires backend)
  getUserSavedJobs: async (): Promise<SavedJob[]> => {
    if (isDemoMode) {
      return []; // Empty in demo mode
    }
    const response = await api.get('/jobs/user/saved/');
    return response.data;
  },
};

// Auth API with demo mode handling
export const authApi_service = {
  // Register new user
  register: async (data: {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
    role: 'employer' | 'applicant';
  }): Promise<AuthResponse> => {
    if (isDemoMode) {
      // Simulate successful registration in demo mode
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        username: data.username,
        role: data.role,
        is_active: true,
        date_joined: new Date().toISOString(),
      };
      return {
        user: mockUser,
        token: 'demo-token-' + Date.now(),
        message: 'Registration successful (demo mode)',
      };
    }
    const response = await authApi.post('/register/', data);
    return response.data;
  },

  // Login user
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    if (isDemoMode) {
      // Simulate successful login in demo mode
      const mockUser: User = {
        id: 'demo-user-1',
        email: data.email,
        username: data.email.split('@')[0],
        role: 'applicant',
        is_active: true,
        date_joined: new Date().toISOString(),
      };
      return {
        user: mockUser,
        token: 'demo-token-' + Date.now(),
        message: 'Login successful (demo mode)',
      };
    }
    const response = await authApi.post('/login/', data);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    if (isDemoMode) {
      localStorage.removeItem('token');
      return;
    }
    await authApi.post('/logout/');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    if (isDemoMode) {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      return {
        id: 'demo-user-1',
        email: 'demo@example.com',
        username: 'demouser',
        role: 'applicant',
        is_active: true,
        date_joined: new Date().toISOString(),
      };
    }
    const response = await authApi.get('/me/');
    return response.data;
  },

  // Update current user
  updateCurrentUser: async (data: Partial<User>): Promise<User> => {
    if (isDemoMode) {
      return {
        id: 'demo-user-1',
        email: data.email || 'demo@example.com',
        username: data.username || 'demouser',
        role: 'applicant',
        is_active: true,
        date_joined: new Date().toISOString(),
        ...data,
      } as User;
    }
    const response = await authApi.patch('/me/', data);
    return response.data;
  },
};

export default api;
