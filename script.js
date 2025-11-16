// Sample job data - In production, this would come from an API
window.jobsData = [
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
    let filteredJobs = [...window.jobsData];// DOM elements
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

// Initialize the world map
function initMap() {
    const mapContainer = document.getElementById('jobMap');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    // If Leaflet isn't available, try dynamically loading it from a CDN as a fallback
    if (typeof L === 'undefined') {
        console.warn('Leaflet not detected. Attempting to load from CDN...');
        const jsCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
        const cssCdn = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
        // Load CSS if not present
        if (!document.querySelector('link[href*="leaflet"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssCdn;
            document.head.appendChild(link);
        }

        // Try loading Leaflet script
        loadScript(jsCdn, 5000)
            .then(() => {
                console.log('Leaflet loaded dynamically.');
                renderLeafletMap(mapContainer);
            })
            .catch(err => {
                console.error('Failed to load Leaflet dynamically:', err);
                mapContainer.innerHTML = '<p style="text-align:center;padding:1rem;">Map failed to load. Please refresh the page and check network connectivity.</p>';
            });
        return;
    }

    renderLeafletMap(mapContainer);
}

// Utility to dynamically load a script with a timeout
function loadScript(src, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Script failed to load: ' + src));
        document.head.appendChild(script);

        if (timeoutMs) {
            setTimeout(() => reject(new Error('Script load timeout: ' + src)), timeoutMs);
        }
    });
}

function renderLeafletMap(container) {
    container.innerHTML = '';

    const mapCanvas = document.createElement('div');
    mapCanvas.style.height = '100%';
    mapCanvas.style.width = '100%';
    mapCanvas.className = 'leaflet-map-wrapper';
    container.appendChild(mapCanvas);

    const map = L.map(mapCanvas, {
        zoomControl: true,
        worldCopyJump: true
    }).setView([25, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const jobsByLocation = groupJobsByLocation(window.jobsData);
    const locationCoords = getLocationCoordinates();
    const bounds = [];

    Object.entries(jobsByLocation).forEach(([location, jobs]) => {
        const coords = locationCoords[location];
        if (!coords) {
            console.warn(`Missing coordinates for location: ${location}`);
            return;
        }

        const markerOptions = location === 'Remote' ? {
            icon: L.divIcon({
                className: 'remote-icon',
                html: '<span>R</span>',
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            })
        } : {};

        const marker = L.marker(coords, markerOptions).addTo(map);
        marker.bindPopup(createPopupContent(location, jobs));
        marker.on('popupopen', (event) => attachPopupFilter(event, location));
        marker.on('click', () => filterJobsByLocation(location));

        bounds.push(coords);
    });

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 });
    }

    map.once('load', () => map.invalidateSize());

    appendMapLegend(container);

    // Expose map on container so toggle function can access it
    try { container._leafletMap = map; window._currentLeafletMap = map; } catch (e) {}
}

function groupJobsByLocation(jobs) {
    return jobs.reduce((acc, job) => {
        const location = job.location || 'Remote';
        if (!acc[location]) {
            acc[location] = [];
        }
        acc[location].push(job);
        return acc;
    }, {});
}

function getLocationCoordinates() {
    return {
        'San Francisco': [37.7749, -122.4194],
        'New York': [40.7128, -74.0060],
        'London': [51.5074, -0.1278],
        'Berlin': [52.52, 13.405],
        'Remote': [0, 0]
    };
}

function createPopupContent(location, jobs) {
    const limitedJobs = jobs.slice(0, 4);
    const remaining = jobs.length - limitedJobs.length;
    const jobItems = limitedJobs.map(job => `<li>${job.title} &mdash; ${job.company}</li>`).join('');

    return `
        <div class="map-popup">
            <strong>${location}</strong><br/>
            ${jobs.length} job${jobs.length !== 1 ? 's' : ''}
            <ul>${jobItems}</ul>
            ${remaining > 0 ? `<em>+${remaining} more</em>` : ''}
            <button type="button" class="map-popup-action">View roles</button>
        </div>
    `;
}

function attachPopupFilter(event, location) {
    const popupEl = event.popup.getElement();
    if (!popupEl) return;
    const actionBtn = popupEl.querySelector('.map-popup-action');
    if (!actionBtn) return;

    actionBtn.onclick = (btnEvent) => {
        btnEvent.preventDefault();
        filterJobsByLocation(location);
        event.popup.close();
    };
}

function appendMapLegend(container) {
    const legend = document.createElement('div');
    legend.className = 'map-legend';
    legend.innerHTML = `
        <div><span style="background:#2563eb"></span>City locations</div>
        <div><span style="background:#10b981"></span>Remote roles</div>
        <div>Tap a marker to filter job cards</div>
    `;

    const parentSection = container.closest('.map-section');
    if (parentSection) {
        const existingLegend = parentSection.querySelector('.map-legend');
        if (existingLegend) {
            existingLegend.remove();
        }
        parentSection.appendChild(legend);
    } else {
        container.appendChild(legend);
    }

    // Append a fullscreen toggle button on the map container (top-right overlay)
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'map-fullscreen-btn';
    fullscreenBtn.setAttribute('aria-label', 'Toggle full screen');
    fullscreenBtn.innerHTML = '<span class="icon">⛶</span><span class="label">Full Screen</span>';
    // create event listener
    fullscreenBtn.addEventListener('click', () => {
        const mapSection = container.closest('.map-section');
        if (!mapSection) return;
        toggleMapFullscreen(mapSection);
    });
    // ensure only one button exists
    const existingBtn = container.querySelector('.map-fullscreen-btn');
    if (existingBtn) existingBtn.remove();
    container.appendChild(fullscreenBtn);
}

function toggleMapFullscreen(section) {
    const container = section.querySelector('.map-container');
    if (!container) return;
    const map = container._leafletMap || window._currentLeafletMap;
    const btn = section.querySelector('.map-fullscreen-btn');

    const ENTERED = section.classList.toggle('fullscreen');
    if (ENTERED) {
        // remember scroll position
        section._previousScroll = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.overflow = 'hidden';
        if (btn) btn.querySelector('.label').textContent = 'Exit Full Screen';
    } else {
        document.body.style.overflow = '';
        if (section._previousScroll != null) window.scrollTo(0, section._previousScroll);
        if (btn) btn.querySelector('.label').textContent = 'Full Screen';
    }

    // Resize the map to make sure it renders properly
    setTimeout(() => {
        try {
            if (map && typeof map.invalidateSize === 'function') map.invalidateSize();
        } catch (e) { console.warn('Error invalidating map size on fullscreen toggle', e); }
    }, 200);
}

// Listen for Escape key to exit fullscreen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const active = document.querySelector('.map-section.fullscreen');
        if (active) toggleMapFullscreen(active);
    }
});

function filterJobsByLocation(location) {
    // Update location filter
    const locationFilter = document.getElementById('locationFilter');
    let filterValue = '';
    
    switch(location) {
        case 'Remote':
            filterValue = 'remote';
            break;
        case 'New York':
            filterValue = 'new-york';
            break;
        case 'San Francisco':
            filterValue = 'san-francisco';
            break;
        case 'London':
            filterValue = 'london';
            break;
        case 'Berlin':
            filterValue = 'berlin';
            break;
    }
    
    locationFilter.value = filterValue;

    // Trigger filter
    filterJobs();

    // Scroll to jobs section
    document.querySelector('.jobs-section').scrollIntoView({ behavior: 'smooth' });
}

// Initialize the page
function init() {
    renderJobs(window.jobsData);
    attachEventListeners();
    // Initialize map after DOM elements are ready
    setTimeout(initMap, 100);
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
    card.onclick = () => showJobDetail(job);
    
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

// Show job detail in modal
function showJobDetail(job) {
    const jobDetail = document.getElementById('jobDetail');
    
    jobDetail.innerHTML = `
        <div class="job-detail-header">
            <h2 class="job-detail-title">${job.title}</h2>
            <p class="job-detail-company">${job.company}</p>
            <div class="job-detail-meta">
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
                <span class="meta-item">
                    <i class="fas fa-dollar-sign"></i>
                    ${job.salary}
                </span>
                <span class="meta-item">
                    <i class="far fa-clock"></i>
                    Posted ${job.posted}
                </span>
            </div>
        </div>
        
        <div class="job-detail-section">
            <h3>About the Role</h3>
            <p>${job.description}</p>
        </div>
        
        <div class="job-detail-section">
            <h3>Requirements</h3>
            <ul>
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="job-detail-section">
            <h3>Responsibilities</h3>
            <ul>
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
        
        <div class="job-detail-section">
            <h3>Skills</h3>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <button class="apply-btn" onclick="applyForJob(${job.id})">
            <i class="fas fa-paper-plane"></i> Apply Now
        </button>
    `;
    
    modal.style.display = 'block';
}

// Apply for job (placeholder function)
function applyForJob(jobId) {
    alert(`Application process for job ID ${jobId} would be initiated here. In a real application, this would redirect to an application form or external website.`);
}

// Filter jobs based on search and filters
function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const location = locationFilter.value;
    const type = typeFilter.value;
    const category = categoryFilter.value;
    
    filteredJobs = window.jobsData.filter(job => {
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
        
        // Example API call (replace with your actual API endpoint)
        // const response = await fetch('https://api.example.com/jobs');
        // const data = await response.json();
        // window.jobsData = data;
        
        loading.style.display = 'none';
        renderJobs(window.jobsData);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        loading.style.display = 'none';
        noResults.style.display = 'block';
    }
}

// Uncomment to use API integration
// fetchJobsFromAPI();
