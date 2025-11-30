/**
 * Job Service - Business logic for job operations
 * Handles job fetching, filtering, and caching
 */

import { httpClient } from './http.service';
import { CONFIG } from '../config/constants';
import type { Job, JobFilters, ApiResponse } from '../types';

// Mock data for development
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco",
    type: "full-time",
    category: "technology",
    salary: "$120k - $160k",
    posted: "2024-11-28T10:00:00Z",
    description: "We're looking for an experienced Frontend Developer to join our dynamic team and help build cutting-edge web applications.",
    requirements: [
      "5+ years of experience with React.js",
      "Strong knowledge of HTML, CSS, and JavaScript",
      "Experience with modern frontend tools and workflows",
      "Excellent problem-solving skills"
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
      "Optimize applications for maximum performance"
    ],
    tags: ["React", "JavaScript", "CSS", "TypeScript"]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "full-time",
    category: "design",
    salary: "$90k - $130k",
    posted: "2024-11-29T14:30:00Z",
    description: "Join our creative team to design beautiful and intuitive user experiences for web and mobile applications.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design skills",
      "Understanding of user-centered design principles"
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research and usability testing",
      "Design user interfaces for web and mobile",
      "Collaborate with developers and stakeholders"
    ],
    tags: ["Figma", "UI Design", "UX Research", "Prototyping"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York",
    type: "full-time",
    category: "technology",
    salary: "$100k - $150k",
    posted: "2024-11-27T09:15:00Z",
    description: "Exciting opportunity to work on innovative products using modern technologies in a fast-paced startup environment.",
    requirements: [
      "Experience with Node.js and React",
      "Knowledge of databases (SQL and NoSQL)",
      "Understanding of RESTful APIs",
      "Strong communication skills"
    ],
    responsibilities: [
      "Build and maintain full-stack applications",
      "Design and implement APIs",
      "Work with database design and optimization",
      "Participate in agile development processes"
    ],
    tags: ["Node.js", "React", "MongoDB", "Express"]
  },
];

export class JobService {
  private cache: Map<string, { data: Job[]; timestamp: number }> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes
  
  /**
   * Fetch jobs from API with optional filters
   */
  async fetchJobs(filters?: JobFilters): Promise<ApiResponse<Job[]>> {
    const cacheKey = JSON.stringify(filters || {});
    const cached = this.cache.get(cacheKey);
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return {
        success: true,
        data: cached.data,
      };
    }
    
    try {
      const response = await httpClient.get<Job[]>(CONFIG.API.ENDPOINTS.JOBS, {
        params: filters,
      });
      
      if (response.success && response.data) {
        // Cache the response
        this.cache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });
      }
      
      return response;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      
      // Fallback to mock data
      return {
        success: true,
        data: this.filterJobs(MOCK_JOBS, filters || {}),
      };
    }
  }
  
  /**
   * Fetch single job by ID
   */
  async fetchJob(id: number): Promise<ApiResponse<Job>> {
    try {
      const response = await httpClient.get<Job>(`${CONFIG.API.ENDPOINTS.JOBS}/${id}`);
      
      if (response.success) {
        return response;
      }
      
      // Fallback to mock data
      const job = MOCK_JOBS.find(j => j.id === id);
      
      if (job) {
        return {
          success: true,
          data: job,
        };
      }
      
      return {
        success: false,
        error: 'Job not found',
      };
    } catch (error) {
      console.error('Error fetching job:', error);
      
      // Fallback to mock data
      const job = MOCK_JOBS.find(j => j.id === id);
      
      if (job) {
        return {
          success: true,
          data: job,
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Filter jobs locally
   */
  private filterJobs(jobs: Job[], filters: JobFilters): Job[] {
    return jobs.filter(job => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
      
      // Location filter
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filters.type && job.type !== filters.type) {
        return false;
      }
      
      // Category filter
      if (filters.category && job.category !== filters.category) {
        return false;
      }
      
      return true;
    });
  }
  
  /**
   * Get trending jobs (most recent)
   */
  async getTrendingJobs(limit: number = 6): Promise<ApiResponse<Job[]>> {
    const response = await this.fetchJobs();
    
    if (response.success && response.data) {
      // Sort by posted date (most recent first)
      const sorted = [...response.data].sort((a, b) => {
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      });
      
      return {
        success: true,
        data: sorted.slice(0, limit),
      };
    }
    
    return response;
  }
  
  /**
   * Get jobs by category
   */
  async getJobsByCategory(category: string): Promise<ApiResponse<Job[]>> {
    return this.fetchJobs({ category });
  }
  
  /**
   * Search jobs
   */
  async searchJobs(query: string): Promise<ApiResponse<Job[]>> {
    return this.fetchJobs({ search: query });
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Get all mock jobs (for development)
   */
  getMockJobs(): Job[] {
    return MOCK_JOBS;
  }
}

// Singleton instance
export const jobService = new JobService();
