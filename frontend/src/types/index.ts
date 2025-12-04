// Job Types
export interface Company {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  size?: string;
  industry?: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  is_remote: boolean;
  remote_type?: 'fully_remote' | 'hybrid' | 'on_site';
}

export interface Salary {
  min_amount?: number;
  max_amount?: number;
  currency: string;
  period?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Job {
  id: string;
  title: string;
  description: string;
  description_html?: string;
  company: Company;
  location?: Location;
  job_type?: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'internship' | 'freelance';
  experience_level?: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  salary?: Salary;
  benefits?: string[];
  skills?: string[];
  requirements?: string[];
  qualifications?: string[];
  category?: string;
  industry?: string;
  tags?: string[];
  source: string;
  source_url?: string;
  apply_url?: string;
  is_active: boolean;
  is_featured: boolean;
  views_count: number;
  applications_count: number;
  posted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface JobListItem {
  id: string;
  title: string;
  company: Company;
  location?: Location;
  job_type?: string;
  salary?: Salary;
  is_remote: boolean;
  posted_at?: string;
  is_featured: boolean;
}

// User Types
export interface User {
  id: number;
  email: string;
  username: string;
  role: 'admin' | 'employer' | 'applicant';
  phone?: string;
  avatar?: string;
  is_verified: boolean;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface JobSearchParams {
  search?: string;
  job_type?: string;
  location?: string;
  remote?: boolean;
  experience?: string;
  page?: number;
  page_size?: number;
}

// Application Types
export interface JobApplication {
  id: string;
  user_id: number;
  job_id: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';
  cover_letter?: string;
  resume_url?: string;
  applied_at: string;
  notes?: string;
}

export interface SavedJob {
  id: string;
  user_id: number;
  job_id: string;
  saved_at: string;
  notes?: string;
}
