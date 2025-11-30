// Type definitions for ApplyNHire job aggregator platform

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobCategory = 'technology' | 'design' | 'marketing' | 'sales' | 'finance' | 'other';
export type UserRole = 'applicant' | 'employer' | 'admin';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: JobCategory;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  tags: string[];
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Application {
  id: number;
  job_id: number;
  user_id: number;
  status: string;
  applied_at: string;
}
