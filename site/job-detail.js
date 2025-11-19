const API_BASE = 'http://127.0.0.1:8000';

// Sample job data - In production, this would come from an API
const jobsData = [
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

// Utility functions
function formatJobType(type) {
    const types = {
        'full-time': 'Full Time',
        'part-time': 'Part Time',
        'contract': 'Contract',
        'internship': 'Internship'
    };
    return types[type] || type;
}

function formatCategory(category) {
    const categories = {
        'technology': 'Technology',
        'design': 'Design',
        'marketing': 'Marketing',
        'sales': 'Sales',
        'finance': 'Finance'
    };
    return categories[category] || category;
}

// Get job ID from URL parameters
function getJobIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

// Find job by ID
function findJobById(jobId) {
    return jobsData.find(job => job.id === jobId);
}

// Render job detail
function renderJobDetail(job) {
    const container = document.getElementById('jobDetailContainer');
    const companyInitial = job.company.charAt(0);

    container.innerHTML = `
        <div class="job-detail-header">
            <div class="job-detail-header-top">
                <div class="company-logo-large">${companyInitial}</div>
                <div class="job-detail-header-info">
                    <h1 class="job-detail-title">${job.title}</h1>
                    <p class="job-detail-company">${job.company}</p>
                </div>
            </div>
            
            <div class="job-detail-meta-grid">
                <div class="meta-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Location</span>
                    <strong>${job.location}</strong>
                </div>
                <div class="meta-detail">
                    <i class="fas fa-briefcase"></i>
                    <span>Type</span>
                    <strong>${formatJobType(job.type)}</strong>
                </div>
                <div class="meta-detail">
                    <i class="fas fa-folder"></i>
                    <span>Category</span>
                    <strong>${formatCategory(job.category)}</strong>
                </div>
                <div class="meta-detail">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Salary</span>
                    <strong>${job.salary}</strong>
                </div>
                <div class="meta-detail">
                    <i class="far fa-clock"></i>
                    <span>Posted</span>
                    <strong>${job.posted}</strong>
                </div>
            </div>
        </div>

        <div class="job-detail-content">
            <div class="job-detail-main">
                <section class="job-detail-section">
                    <h2>About the Role</h2>
                    <p>${job.description}</p>
                </section>

                <section class="job-detail-section">
                    <h2>Requirements</h2>
                    <ul class="requirements-list">
                        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </section>

                <section class="job-detail-section">
                    <h2>Responsibilities</h2>
                    <ul class="responsibilities-list">
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </section>

                <section class="job-detail-section">
                    <h2>Required Skills</h2>
                    <div class="job-tags">
                        ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </section>
            </div>

            <aside class="job-detail-sidebar">
                <button class="apply-btn-large" onclick="applyForJob(${job.id})">
                    <i class="fas fa-paper-plane"></i> Apply Now
                </button>
                <div class="job-info-card">
                    <h3>How to Apply</h3>
                    <p>Click the "Apply Now" button to submit your application. You'll need to be signed in to your APPLY N HIRE account.</p>
                </div>
                <div class="job-info-card">
                    <h3>Share This Job</h3>
                    <div class="share-buttons">
                        <button class="share-btn" onclick="shareOnLinkedIn(${job.id})" title="Share on LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </button>
                        <button class="share-btn" onclick="shareOnTwitter(${job.id})" title="Share on Twitter">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="share-btn" onclick="copyJobLink()" title="Copy link">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    `;
}

// Apply for job
function applyForJob(jobId) {
    const session = (window.authCommon && typeof authCommon.getSession === 'function') 
        ? authCommon.getSession() 
        : JSON.parse(localStorage.getItem('applynhireSession'));
    
    if (!session) {
        const goToAuth = confirm('You need to be signed in to apply. Sign in now?');
        if (goToAuth) {
            window.location.href = 'signin.html';
        }
        return;
    }

    const cover = prompt('Optional: Add a short cover message (or press OK to skip):');
    const applicantName = session.name || '';
    const applicantEmail = session.email;
    const payload = { job_id: jobId, name: applicantName, email: applicantEmail, cover_letter: cover };

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

// Share functions
function shareOnLinkedIn(jobId) {
    const url = window.location.href;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInShareUrl, '_blank');
}

function shareOnTwitter(jobId) {
    const url = window.location.href;
    const job = findJobById(jobId);
    const text = `Check out this ${job.title} position at ${job.company} on APPLY N HIRE!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function copyJobLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Job link copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy link');
    });
}

// Initialize page
function init() {
    const jobId = getJobIdFromURL();
    
    if (!jobId || isNaN(jobId)) {
        showNoJobFound();
        return;
    }

    const job = findJobById(jobId);
    
    if (!job) {
        showNoJobFound();
        return;
    }

    // Update page title
    document.title = `${job.title} at ${job.company} - APPLY N HIRE`;
    
    // Hide loading, show content
    document.getElementById('loadingDetail').style.display = 'none';
    document.getElementById('jobDetailContainer').style.display = 'block';
    
    // Render job details
    renderJobDetail(job);
}

function showNoJobFound() {
    document.getElementById('loadingDetail').style.display = 'none';
    document.getElementById('jobDetailContainer').style.display = 'none';
    document.getElementById('noJobFound').style.display = 'block';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
