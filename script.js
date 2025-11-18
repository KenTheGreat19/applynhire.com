// ==================== DEMO JOB DATA ====================
const demoJobs = [
    {
        id: 1,
        title: "Customer Experience Associate I - Healthcare Savings Non Voice",
        company: "ANH Recruitment Manpower",
        type: "Agency",
        rating: 5.0,
        reviews: 1,
        workMode: "On-site",
        location: "Manila, Capital District, Metro Manila, Philippines",
        jobType: "Full Time",
        salary: "$10K-$10K",
        description: "Through our dedicated associates, Conduent delivers mission-critical services and solutions on behalf of Fortune 100 com...",
        postedTime: "2 days ago",
        views: 18,
        applications: 0,
        trending: true
    },
    {
        id: 2,
        title: "Supervisor, Customer Experience",
        company: "ANH Recruitment Manpower",
        type: "Agency",
        rating: 5.0,
        reviews: 1,
        workMode: "On-site",
        location: "Batangas City, Batangas, Calabarzon, 4200, Philippines",
        jobType: "Full Time",
        salary: "$10K-$10K",
        description: "Through our dedicated associates, Conduent delivers mission-critical services and solutions on behalf of Fortune 100 com...",
        postedTime: "2 days ago",
        views: 12,
        applications: 0,
        trending: true
    }
];

const categories = [
    { name: "Customer Service", icon: "❤️", count: 2 },
    { name: "Technology", icon: "💻", count: 0 },
    { name: "Healthcare", icon: "🏥", count: 0 },
    { name: "Sales", icon: "💰", count: 0 },
    { name: "Marketing", icon: "📱", count: 0 },
    { name: "Finance", icon: "📊", count: 0 }
];

// ==================== THEME MANAGEMENT ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `${savedTheme}-theme`;
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.className = `${newTheme}-theme`;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ==================== LANGUAGE MANAGEMENT ====================
const languageData = {
    en: { flag: "🇬🇧", name: "English" },
    es: { flag: "🇪🇸", name: "Español" },
    fr: { flag: "🇫🇷", name: "Français" },
    de: { flag: "🇩🇪", name: "Deutsch" }
};

function initializeLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguageDisplay(savedLang);
}

function updateLanguageDisplay(lang) {
    const langBtn = document.getElementById('langBtn');
    if (langBtn && languageData[lang]) {
        langBtn.querySelector('.flag-icon').textContent = languageData[lang].flag;
    }
}

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function selectLanguage(lang) {
    localStorage.setItem('language', lang);
    updateLanguageDisplay(lang);
    toggleLanguageDropdown();
    // Here you would typically trigger translation of the page content
    console.log(`Language changed to: ${languageData[lang].name}`);
}

// ==================== PROMO BANNER ====================
function initializePromoBanner() {
    const banner = document.getElementById('promoBanner');
    const closeBtn = document.getElementById('closeBanner');
    const bannerClosed = localStorage.getItem('promoBannerClosed');
    
    if (bannerClosed === 'true') {
        banner.classList.add('hidden');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            localStorage.setItem('promoBannerClosed', 'true');
        });
    }
}

// ==================== VIEW TOGGLE (MAP/LIST) ====================
function initializeViewToggle() {
    const mapViewBtn = document.getElementById('mapViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const mapContainer = document.getElementById('mapContainer');
    const listContainer = document.getElementById('listContainer');
    
    if (mapViewBtn && listViewBtn) {
        mapViewBtn.addEventListener('click', () => {
            mapViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            mapContainer.style.display = 'flex';
            listContainer.style.display = 'none';
        });
        
        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            mapViewBtn.classList.remove('active');
            mapContainer.style.display = 'none';
            listContainer.style.display = 'block';
        });
    }
}

// ==================== JOB RENDERING ====================
function renderJobCard(job) {
    return `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    ${job.trending ? '<div class="job-card-badge">📈 Trending Jobs</div>' : ''}
                </div>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">
                <span>${job.company}</span>
                <span class="company-badge">${job.type}</span>
                <span>⭐ ${job.rating} (${job.reviews})</span>
            </div>
            <div class="job-meta">
                <div class="job-meta-item">
                    <i class="fas fa-map-pin"></i>
                    <span>${job.workMode}</span>
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
            </div>
            <div class="job-meta">
                <span class="job-type-badge">${job.jobType}</span>
                <span class="job-salary">${job.salary}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-stats">
                <div class="job-stat">
                    <i class="fas fa-clock"></i>
                    <span>${job.postedTime}</span>
                </div>
                <div class="job-stat">
                    <i class="fas fa-eye"></i>
                    <span>${job.views} views</span>
                </div>
                <div class="job-stat">
                    <i class="fas fa-user"></i>
                    <span>${job.applications} applications</span>
                </div>
            </div>
            <div class="job-actions">
                <button class="job-btn job-btn-primary" onclick="applyToJob(${job.id})">View Details</button>
                <button class="job-btn job-btn-secondary" onclick="likeJob(${job.id})">
                    <i class="far fa-heart"></i>
                    <span class="like-count">0</span>
                    Like
                </button>
            </div>
        </div>
    `;
}

function renderCategoryCard(category) {
    return `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-icon">${category.icon}</div>
            <h3 class="category-name">${category.name}</h3>
            <p class="category-count">${category.count} jobs</p>
        </div>
    `;
}

function loadJobs() {
    // Load trending jobs
    const trendingJobsList = document.getElementById('trendingJobsList');
    if (trendingJobsList) {
        const trendingJobs = demoJobs.filter(job => job.trending);
        trendingJobsList.innerHTML = trendingJobs.map(job => renderJobCard(job)).join('');
    }
    
    // Load search results
    const searchJobsList = document.getElementById('searchJobsList');
    if (searchJobsList) {
        searchJobsList.innerHTML = demoJobs.map(job => renderJobCard(job)).join('');
    }
    
    // Update search results count
    const searchResultsCount = document.getElementById('searchResultsCount');
    if (searchResultsCount) {
        searchResultsCount.textContent = demoJobs.length;
    }
}

function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(category => renderCategoryCard(category)).join('');
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function performSearch() {
    const jobTitle = document.getElementById('jobTitleInput')?.value || '';
    const location = document.getElementById('locationInput')?.value || '';
    const jobType = document.getElementById('jobTypeSelect')?.value || '';
    const minSalary = document.getElementById('minSalaryInput')?.value || '';
    
    console.log('Searching with:', { jobTitle, location, jobType, minSalary });
    
    // Filter jobs based on search criteria
    let filteredJobs = demoJobs.filter(job => {
        const matchesTitle = !jobTitle || job.title.toLowerCase().includes(jobTitle.toLowerCase());
        const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
        const matchesType = !jobType || job.jobType.toLowerCase() === jobType.toLowerCase();
        
        return matchesTitle && matchesLocation && matchesType;
    });
    
    // Update search results
    const searchJobsList = document.getElementById('searchJobsList');
    if (searchJobsList) {
        if (filteredJobs.length > 0) {
            searchJobsList.innerHTML = filteredJobs.map(job => renderJobCard(job)).join('');
        } else {
            searchJobsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No jobs found matching your criteria.</p>';
        }
    }
    
    // Update count
    const searchResultsCount = document.getElementById('searchResultsCount');
    if (searchResultsCount) {
        searchResultsCount.textContent = filteredJobs.length;
    }
    
    // Switch to list view to show results
    document.getElementById('listViewBtn')?.click();
}

function clearFilters() {
    document.getElementById('jobTitleInput').value = '';
    document.getElementById('locationInput').value = '';
    document.getElementById('jobTypeSelect').value = '';
    document.getElementById('minSalaryInput').value = '';
    
    // Reload all jobs
    loadJobs();
}

// ==================== JOB ACTIONS ====================
function applyToJob(jobId) {
    const job = demoJobs.find(j => j.id === jobId);
    if (job) {
        alert(`Applying to: ${job.title}\n\nThis would redirect to the application page.`);
        // In a real app, redirect to application page or open modal
    }
}

function likeJob(jobId) {
    console.log(`Liked job ID: ${jobId}`);
    // In a real app, this would save to backend and update UI
    alert('Job saved to your favorites!');
}

function filterByCategory(categoryName) {
    console.log(`Filtering by category: ${categoryName}`);
    alert(`Filtering jobs by ${categoryName} category.\n\nThis feature would show jobs in this category.`);
}

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Language selector
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguageDropdown);
    }
    
    // Language options
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            selectLanguage(lang);
        });
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const langSelector = document.querySelector('.language-selector');
        if (langSelector && !langSelector.contains(event.target)) {
            document.getElementById('langDropdown')?.classList.remove('active');
        }
    });
    
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Enter key on search inputs
    ['jobTitleInput', 'locationInput', 'minSalaryInput'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializePromoBanner();
    initializeViewToggle();
    initializeEventListeners();
    loadJobs();
    loadCategories();
    
    console.log('✅ Website initialized successfully!');
    console.log('Features active: Theme Toggle, Language Selector, Trending Jobs, Categories');
});
