import type { Job, JobFilters, ApiResponse } from '../types';

const API_BASE = 'http://127.0.0.1:8000';

// Sample job data - In production, this would come from an API
const jobsData: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco",
    type: "full-time",
    category: "technology",
    salary: "$120k - $160k",
    posted: "2 days ago",
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
    posted: "1 day ago",
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
    posted: "3 days ago",
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
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "London",
    type: "full-time",
    category: "marketing",
    salary: "£60k - £80k",
    posted: "5 days ago",
    description: "Lead our marketing efforts and help drive growth through innovative campaigns and strategies.",
    requirements: [
      "5+ years of marketing experience",
      "Experience with digital marketing channels",
      "Strong analytical and strategic thinking",
      "Excellent written and verbal communication"
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage marketing campaigns across channels",
      "Analyze campaign performance and ROI",
      "Lead and mentor marketing team members"
    ],
    tags: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    type: "contract",
    category: "technology",
    salary: "$130k - $170k",
    posted: "1 week ago",
    description: "Help us build and maintain scalable cloud infrastructure using modern DevOps practices.",
    requirements: [
      "Experience with AWS, Azure, or GCP",
      "Strong knowledge of Docker and Kubernetes",
      "Experience with CI/CD pipelines",
      "Scripting skills (Python, Bash, etc.)"
    ],
    responsibilities: [
      "Design and maintain cloud infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance and reliability",
      "Automate deployment processes"
    ],
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "DataInsights",
    location: "Berlin",
    type: "full-time",
    category: "technology",
    salary: "€50k - €70k",
    posted: "4 days ago",
    description: "Analyze data to provide actionable insights and support data-driven decision making.",
    requirements: [
      "Strong SQL and data analysis skills",
      "Experience with Python or R",
      "Knowledge of data visualization tools",
      "Statistical analysis background"
    ],
    responsibilities: [
      "Analyze complex datasets",
      "Create reports and dashboards",
      "Collaborate with stakeholders",
      "Identify trends and patterns in data"
    ],
    tags: ["SQL", "Python", "Tableau", "Statistics"]
  },
  {
    id: 7,
    title: "Product Manager",
    company: "InnovateTech",
    location: "San Francisco",
    type: "full-time",
    category: "technology",
    salary: "$140k - $180k",
    posted: "2 days ago",
    description: "Drive product strategy and execution for our flagship products.",
    requirements: [
      "5+ years of product management experience",
      "Strong technical background",
      "Experience with agile methodologies",
      "Excellent stakeholder management skills"
    ],
    responsibilities: [
      "Define product vision and roadmap",
      "Prioritize features and requirements",
      "Work with engineering and design teams",
      "Analyze market trends and competition"
    ],
    tags: ["Product Strategy", "Agile", "Roadmap", "Analytics"]
  },
  {
    id: 8,
    title: "Junior Web Developer",
    company: "WebAgency",
    location: "Remote",
    type: "full-time",
    category: "technology",
    salary: "$50k - $70k",
    posted: "1 day ago",
    description: "Great opportunity for a junior developer to grow their skills in a supportive environment.",
    requirements: [
      "1-2 years of web development experience",
      "Knowledge of HTML, CSS, and JavaScript",
      "Eagerness to learn new technologies",
      "Good communication skills"
    ],
    responsibilities: [
      "Build responsive websites",
      "Maintain existing web applications",
      "Work with senior developers",
      "Learn best practices and modern tools"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Git"]
  },
  {
    id: 9,
    title: "Sales Executive",
    company: "SalesPro",
    location: "New York",
    type: "full-time",
    category: "sales",
    salary: "$70k - $100k + Commission",
    posted: "3 days ago",
    description: "Drive sales growth and build lasting relationships with clients.",
    requirements: [
      "3+ years of B2B sales experience",
      "Proven track record of meeting targets",
      "Excellent negotiation skills",
      "CRM experience (Salesforce preferred)"
    ],
    responsibilities: [
      "Generate new business opportunities",
      "Manage sales pipeline",
      "Present product demos to clients",
      "Close deals and meet sales quotas"
    ],
    tags: ["B2B Sales", "Salesforce", "Lead Generation", "Negotiation"]
  },
  {
    id: 10,
    title: "Content Writer",
    company: "ContentCreators",
    location: "Remote",
    type: "part-time",
    category: "marketing",
    salary: "$30k - $45k",
    posted: "6 days ago",
    description: "Create engaging content for various digital platforms and audiences.",
    requirements: [
      "2+ years of content writing experience",
      "Excellent writing and editing skills",
      "SEO knowledge",
      "Ability to work independently"
    ],
    responsibilities: [
      "Write blog posts and articles",
      "Create social media content",
      "Optimize content for SEO",
      "Collaborate with marketing team"
    ],
    tags: ["Content Writing", "SEO", "Blogging", "Social Media"]
  },
  {
    id: 11,
    title: "Mobile App Developer",
    company: "AppStudio",
    location: "San Francisco",
    type: "full-time",
    category: "technology",
    salary: "$110k - $150k",
    posted: "2 days ago",
    description: "Build innovative mobile applications for iOS and Android platforms.",
    requirements: [
      "Experience with React Native or Flutter",
      "Understanding of mobile UI/UX principles",
      "Knowledge of mobile app deployment",
      "Strong problem-solving skills"
    ],
    responsibilities: [
      "Develop cross-platform mobile apps",
      "Optimize app performance",
      "Work with APIs and backend services",
      "Test and debug applications"
    ],
    tags: ["React Native", "Flutter", "Mobile Development", "iOS"]
  },
  {
    id: 12,
    title: "Financial Analyst",
    company: "FinanceGroup",
    location: "London",
    type: "full-time",
    category: "finance",
    salary: "£55k - £75k",
    posted: "1 week ago",
    description: "Provide financial analysis and support strategic business decisions.",
    requirements: [
      "Bachelor's degree in Finance or related field",
      "3+ years of financial analysis experience",
      "Advanced Excel skills",
      "Strong analytical thinking"
    ],
    responsibilities: [
      "Perform financial modeling and analysis",
      "Prepare financial reports",
      "Support budgeting and forecasting",
      "Present findings to management"
    ],
    tags: ["Financial Modeling", "Excel", "Forecasting", "Analysis"]
  }
];

// API functions
async function fetchJobs(filters?: JobFilters): Promise<ApiResponse<Job[]>> {
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.category) params.append('category', filters.category);

    const response = await fetch(`${API_BASE}/api/jobs?${params}`);
    const data = await response.json();
    
    return {
      success: response.ok,
      data: data,
      error: response.ok ? undefined : 'Failed to fetch jobs'
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Fallback to local data
    return {
      success: true,
      data: jobsData
    };
  }
}

function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  return jobs.filter(job => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.type && job.type !== filters.type) {
      return false;
    }

    if (filters.category && job.category !== filters.category) {
      return false;
    }

    return true;
  });
}

function renderJobs(jobs: Job[], containerId: string = 'job-listings'): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="empty-state-grid">
        ${Array(6).fill(0).map(() => `
          <div class="job-card job-card-empty">
            <div class="empty-card-content">
              <div class="empty-icon">
                <i class="fas fa-briefcase"></i>
              </div>
              <h3 class="empty-title">No Jobs Available</h3>
              <p class="empty-text">Check back soon for new opportunities in this area</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="job-card" data-job-id="${job.id}">
      <div class="job-card-header">
        <div class="job-title-section">
          <h3 class="job-title">${escapeHtml(job.title)}</h3>
          <div class="job-company">
            <i class="fas fa-building"></i>
            ${escapeHtml(job.company)}
          </div>
        </div>
        <button class="btn-like" aria-label="Save job">
          <i class="far fa-heart"></i>
        </button>
      </div>
      
      <div class="job-meta">
        <div class="job-meta-item">
          <i class="fas fa-map-marker-alt"></i>
          ${escapeHtml(job.location)}
        </div>
        <div class="job-meta-item">
          <i class="fas fa-briefcase"></i>
          ${job.type.replace('-', ' ')}
        </div>
        <div class="job-meta-item">
          <i class="fas fa-dollar-sign"></i>
          ${escapeHtml(job.salary)}
        </div>
      </div>

      <div class="job-description">
        ${escapeHtml(job.description.substring(0, 120))}...
      </div>

      <div class="job-tags">
        ${job.tags.slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
      </div>

      <div class="job-footer">
        <div class="job-posted">
          <i class="fas fa-clock"></i>
          ${escapeHtml(job.posted)}
        </div>
        <button class="btn-view-job" data-job-id="${job.id}">
          View Job
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Add click handlers
  container.querySelectorAll<HTMLButtonElement>('.btn-view-job').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      if (jobId) {
        showJobDetails(parseInt(jobId, 10));
      }
    });
  });

  // Add like button handlers
  container.querySelectorAll<HTMLButtonElement>('.btn-like').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = btn.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
      }
    });
  });
}

function showJobDetails(jobId: number): void {
  const job = jobsData.find(j => j.id === jobId);
  if (!job) return;

  // Store job details in sessionStorage for detail page
  sessionStorage.setItem('currentJob', JSON.stringify(job));
  
  // Navigate to job detail page or show modal
  window.location.href = `job-detail.html?id=${jobId}`;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Get all necessary elements
  const searchBtn = document.getElementById('searchBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const jobTitleInput = document.getElementById('jobTitleInput') as HTMLInputElement | null;
  const locationInput = document.getElementById('locationInput') as HTMLInputElement | null;
  const jobTypeSelect = document.getElementById('jobTypeSelect') as HTMLSelectElement | null;
  const minSalaryInput = document.getElementById('minSalaryInput') as HTMLInputElement | null;
  
  const mapViewBtn = document.getElementById('mapViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const mapContainer = document.getElementById('mapContainer');
  const listContainer = document.getElementById('listContainer');
  
  const trendingJobsList = document.getElementById('trendingJobsList');
  const searchJobsList = document.getElementById('searchJobsList');

  // Initial render of trending jobs
  if (trendingJobsList) {
    renderJobs(jobsData.slice(0, 6), 'trendingJobsList');
  }

  // Initial render of search results (show all jobs)
  if (searchJobsList) {
    renderJobs(jobsData, 'searchJobsList');
  }

  // Update search results count
  const searchResultsCount = document.getElementById('searchResultsCount');
  if (searchResultsCount) {
    searchResultsCount.textContent = jobsData.length.toString();
  }

  // Search functionality
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const filters: JobFilters = {
        search: jobTitleInput?.value || undefined,
        location: locationInput?.value || undefined,
        type: jobTypeSelect?.value || undefined
      };

      const filtered = filterJobs(jobsData, filters);
      if (searchJobsList) {
        renderJobs(filtered, 'searchJobsList');
      }
      if (searchResultsCount) {
        searchResultsCount.textContent = filtered.length.toString();
      }
    });
  }

  // Clear filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      if (jobTitleInput) jobTitleInput.value = '';
      if (locationInput) locationInput.value = '';
      if (jobTypeSelect) jobTypeSelect.value = '';
      if (minSalaryInput) minSalaryInput.value = '';
      
      if (searchJobsList) {
        renderJobs(jobsData, 'searchJobsList');
      }
      if (searchResultsCount) {
        searchResultsCount.textContent = jobsData.length.toString();
      }
    });
  }

  // View toggle (Map/List)
  if (mapViewBtn && listViewBtn && mapContainer && listContainer) {
    mapViewBtn.addEventListener('click', () => {
      mapViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      mapContainer.style.display = 'block';
      listContainer.style.display = 'none';
    });

    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      mapViewBtn.classList.remove('active');
      listContainer.style.display = 'block';
      mapContainer.style.display = 'none';
    });
  }

  // Close promo banner
  const closeBanner = document.getElementById('closeBanner');
  const promoBanner = document.getElementById('promoBanner');
  if (closeBanner && promoBanner) {
    closeBanner.addEventListener('click', () => {
      promoBanner.style.display = 'none';
    });
  }

  // Try to fetch from API (optional)
  fetchJobs().then(response => {
    if (response.success && response.data && response.data.length > 0) {
      if (trendingJobsList) {
        renderJobs(response.data.slice(0, 6), 'trendingJobsList');
      }
      if (searchJobsList) {
        renderJobs(response.data, 'searchJobsList');
      }
      if (searchResultsCount) {
        searchResultsCount.textContent = response.data.length.toString();
      }
    }
  }).catch(() => {
    // Silently fail and use local data
    console.log('Using local job data');
  });
});

// Export for use in other modules
export { jobsData, fetchJobs, filterJobs, renderJobs, showJobDetails };
