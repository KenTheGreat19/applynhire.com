const API_BASE = 'http://127.0.0.1:8000';

// Sample job data - In production, this would come from an API
let jobsData = [
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

// State management
let filteredJobs = [...jobsData];

// DOM elements
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const typeFilter = document.getElementById('typeFilter');
const categoryFilter = document.getElementById('categoryFilter');
const jobsList = document.getElementById('jobsList');
const resultsCount = document.getElementById('resultsCount');
const clearFilters = document.getElementById('clearFilters');
const noResults = document.getElementById('noResults');
const loading = document.getElementById('loading');
const modal = document.getElementById('jobModal');
const closeModal = document.getElementsByClassName('close')[0];

// Initialize the page
async function init() {
    await fetchJobsFromAPI();
    attachEventListeners();
}

// Render jobs to the page
function renderJobs(jobs) {
    jobsList.innerHTML = '';
    
    if (jobs.length === 0) {
        noResults.style.display = 'block';
        jobsList.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        jobsList.style.display = 'grid';
        
        jobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobsList.appendChild(jobCard);
        });
    }
    
    resultsCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;
}

// Create a job card element
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.style.cursor = 'pointer';
    card.onclick = () => navigateToJobDetail(job.id);
    
    const companyInitial = job.company.charAt(0);
    
    card.innerHTML = `
        <div class="job-card-header">
            <div class="company-logo">${companyInitial}</div>
            <div class="job-info">
                <h3 class="job-title">${job.title}</h3>
                <p class="company-name">${job.company}</p>
            </div>
        </div>
        <div class="job-meta">
            <span class="meta-item">
                <i class="fas fa-map-marker-alt"></i>
                ${job.location}
            </span>
            <span class="meta-item">
                <i class="fas fa-briefcase"></i>
                ${formatJobType(job.type)}
            </span>
            <span class="meta-item">
                <i class="fas fa-folder"></i>
                ${formatCategory(job.category)}
            </span>
        </div>
        <p class="job-description">${job.description}</p>
        <div class="job-tags">
            ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="job-footer">
            <span class="salary">${job.salary}</span>
            <span class="posted-date">
                <i class="far fa-clock"></i> ${job.posted}
            </span>
        </div>
    `;
    
    return card;
}

// Navigate to job detail page
function navigateToJobDetail(jobId) {
    window.location.href = `job-detail.html?id=${jobId}`;
}

// Apply for job (placeholder function)
function applyForJob(jobId) {
    const session = (window.authCommon && typeof authCommon.getSession === 'function') ? authCommon.getSession() : JSON.parse(localStorage.getItem('applynhireSession'));
    if (!session) {
        const goToAuth = confirm('You need to be signed in to apply. Sign in now?');
        if (goToAuth) {
            window.location.href = 'applicant.html';
        }
        return;
    }

    // prompt user for a short cover letter
    const cover = prompt('Optional: Add a short cover message (or press OK to skip):');
    const applicantName = session.name || '';
    const applicantEmail = session.email;
    // Build payload
    const payload = { job_id: jobId, name: applicantName, email: applicantEmail, cover_letter: cover };
    // Submit to API, fallback to alert
    (async () => {
        try {
            let headers = { 'Content-Type': 'application/json' };
            if (window.authCommon && typeof authCommon.getAuthHeader === 'function') {
                headers = { ...headers, ...authCommon.getAuthHeader() };
            } else {
                const token = session && session.token ? session.token : null;
                if (token) headers['Authorization'] = `Bearer ${token}`;
            }
            const resp = await fetch(`${API_BASE}/api/jobs/${jobId}/apply`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            if (resp.ok) {
                alert('Application submitted successfully.');
            } else {
                const err = await resp.json().catch(() => ({ detail: 'Application failed' }));
                alert('Application failed: ' + (err.detail || 'Unknown error'));
            }
        } catch (e) {
            console.warn('Apply network error, showing fallback message', e);
            alert(`Application process for job ID ${jobId} would be initiated here. You are signed in as ${applicantEmail} (${session.role}).`);
        }
    })();
}

// Filter jobs based on search and filters
function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const location = locationFilter.value;
    const type = typeFilter.value;
    const category = categoryFilter.value;
    
    filteredJobs = jobsData.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm) ||
                            job.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesLocation = !location || 
                               job.location.toLowerCase().replace(/\s+/g, '-') === location;
        
        const matchesType = !type || job.type === type;
        
        const matchesCategory = !category || job.category === category;
        
        return matchesSearch && matchesLocation && matchesType && matchesCategory;
    });
    
    renderJobs(filteredJobs);
}

// Clear all filters
function clearAllFilters() {
    searchInput.value = '';
    locationFilter.value = '';
    typeFilter.value = '';
    categoryFilter.value = '';
    filterJobs();
}

// Format job type for display
function formatJobType(type) {
    return type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Format category for display
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Attach event listeners
function attachEventListeners() {
    // Search and filter inputs
    searchInput.addEventListener('input', filterJobs);
    locationFilter.addEventListener('change', filterJobs);
    typeFilter.addEventListener('change', filterJobs);
    categoryFilter.addEventListener('change', filterJobs);
    
    // Clear filters button
    clearFilters.addEventListener('click', clearAllFilters);
    
    // Modal close
    closeModal.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Simulate loading jobs (for demo purposes)
function simulateLoading() {
    loading.style.display = 'block';
    jobsList.style.display = 'none';
    
    setTimeout(() => {
        loading.style.display = 'none';
        init();
    }, 800);
}

// Start the application
// simulateLoading(); // Uncomment to show loading animation
init();

// Optional: Function to fetch jobs from an API
async function fetchJobsFromAPI() {
    try {
        loading.style.display = 'block';
        jobsList.style.display = 'none';
        const response = await fetch(`${API_BASE}/api/jobs`);
        if (response.ok) {
            const data = await response.json();
            // normalize data if necessary (backend returns arrays for list fields)
            jobsData = data;
        }
        
        loading.style.display = 'none';
        renderJobs(jobsData);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        loading.style.display = 'none';
        // If we fail to fetch (backend down), fallback to local demo jobs
        console.warn('Falling back to client-side demo jobs');
        renderJobs(jobsData);
    }
}

// Uncomment to use API integration
// fetchJobsFromAPI();
