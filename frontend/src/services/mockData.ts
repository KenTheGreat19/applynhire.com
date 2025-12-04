import type { JobListItem, Job, PaginatedResponse } from '../types';

// Mock job data for demo purposes when backend is not available
export const mockJobs: JobListItem[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: {
      name: 'TechCorp Inc.',
      logo: 'https://ui-avatars.com/api/?name=TC&background=3b82f6&color=fff',
      industry: 'Technology',
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      is_remote: true,
      remote_type: 'hybrid',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 150000,
      max_amount: 200000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: true,
    posted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: {
      name: 'StartupXYZ',
      logo: 'https://ui-avatars.com/api/?name=SX&background=10b981&color=fff',
      industry: 'Fintech',
    },
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      is_remote: false,
      remote_type: 'on_site',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 120000,
      max_amount: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: false,
    posted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: '3',
    title: 'React Native Developer',
    company: {
      name: 'MobileFirst',
      logo: 'https://ui-avatars.com/api/?name=MF&background=8b5cf6&color=fff',
      industry: 'Mobile Apps',
    },
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      is_remote: true,
      remote_type: 'fully_remote',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 110000,
      max_amount: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: true,
    posted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: {
      name: 'CloudScale',
      logo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff',
      industry: 'Cloud Services',
    },
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      is_remote: true,
      remote_type: 'hybrid',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 130000,
      max_amount: 170000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: true,
    posted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: {
      name: 'DataDriven',
      logo: 'https://ui-avatars.com/api/?name=DD&background=ec4899&color=fff',
      industry: 'AI/ML',
    },
    location: {
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      is_remote: true,
      remote_type: 'fully_remote',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 140000,
      max_amount: 180000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: true,
    posted_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: {
      name: 'DesignHub',
      logo: 'https://ui-avatars.com/api/?name=DH&background=06b6d4&color=fff',
      industry: 'Design',
    },
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      is_remote: false,
      remote_type: 'on_site',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 100000,
      max_amount: 130000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: false,
    posted_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
  {
    id: '7',
    title: 'Backend Engineer (Python)',
    company: {
      name: 'APIFirst',
      logo: 'https://ui-avatars.com/api/?name=AF&background=84cc16&color=fff',
      industry: 'SaaS',
    },
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      is_remote: true,
      remote_type: 'hybrid',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 125000,
      max_amount: 155000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: true,
    posted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: true,
  },
  {
    id: '8',
    title: 'Product Manager',
    company: {
      name: 'ProductLab',
      logo: 'https://ui-avatars.com/api/?name=PL&background=f43f5e&color=fff',
      industry: 'Product',
    },
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      is_remote: false,
      remote_type: 'on_site',
    },
    job_type: 'full_time',
    salary: {
      min_amount: 130000,
      max_amount: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    is_remote: false,
    posted_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_featured: false,
  },
];

export const mockCategories = [
  { name: 'Engineering', count: 1250 },
  { name: 'Design', count: 450 },
  { name: 'Product', count: 380 },
  { name: 'Data Science', count: 520 },
  { name: 'Marketing', count: 290 },
  { name: 'Sales', count: 410 },
  { name: 'Operations', count: 180 },
  { name: 'Finance', count: 220 },
];

export const getJobById = (id: string): Job | undefined => {
  const job = mockJobs.find(j => j.id === id);
  if (!job) return undefined;
  
  return {
    ...job,
    description: `We are looking for an experienced ${job.title} to join our team at ${job.company.name}. 

This is an exciting opportunity to work on cutting-edge technology and make a real impact. You'll be working with a talented team of engineers and designers to build products that millions of users love.

**What you'll do:**
- Design and implement scalable solutions
- Collaborate with cross-functional teams
- Mentor junior team members
- Contribute to technical architecture decisions
- Participate in code reviews and best practices

**What we're looking for:**
- 5+ years of relevant experience
- Strong problem-solving skills
- Excellent communication abilities
- Experience with modern development practices
- Passion for building great products`,
    description_html: undefined,
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
    requirements: [
      '5+ years of professional experience',
      'Strong understanding of software design patterns',
      'Experience with agile methodologies',
      'Excellent problem-solving skills',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Strong communication skills',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work flexibility',
      'Learning and development budget',
    ],
    source: 'applynhire',
    source_url: 'https://applynhire.com',
    apply_url: '#',
    is_active: true,
    views_count: Math.floor(Math.random() * 500) + 100,
    applications_count: Math.floor(Math.random() * 50) + 10,
    created_at: job.posted_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export const getMockJobsResponse = (params: {
  search?: string;
  job_type?: string;
  location?: string;
  remote?: boolean;
  page?: number;
  page_size?: number;
}): PaginatedResponse<JobListItem> => {
  let filtered = [...mockJobs];
  
  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(search) ||
      job.company.name.toLowerCase().includes(search)
    );
  }
  
  if (params.job_type) {
    filtered = filtered.filter(job => job.job_type === params.job_type);
  }
  
  if (params.remote) {
    filtered = filtered.filter(job => job.is_remote);
  }
  
  if (params.location) {
    const loc = params.location.toLowerCase();
    filtered = filtered.filter(job => 
      job.location?.city?.toLowerCase().includes(loc) ||
      job.location?.state?.toLowerCase().includes(loc)
    );
  }
  
  const page = params.page || 1;
  const pageSize = params.page_size || 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    results: filtered.slice(start, end),
    count: filtered.length,
    page,
    page_size: pageSize,
    total_pages: Math.ceil(filtered.length / pageSize),
  };
};

export const getFeaturedJobs = (limit: number = 6): JobListItem[] => {
  return mockJobs.filter(job => job.is_featured).slice(0, limit);
};
