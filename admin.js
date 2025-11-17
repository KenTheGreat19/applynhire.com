// Admin Dashboard JavaScript

// Global variables
let jobsData = [];
let currentEditingJob = null;
let jobToDelete = null;

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadJobsData();
    setupEventListeners();
    updateDashboardStats();
});

// Load jobs data from main script
function loadJobsData() {
    // In a real application, this would be an API call
    // For now, we'll use the same data structure as the main site
    if (typeof window.jobsData !== 'undefined') {
        jobsData = [...window.jobsData];
    } else {
        // Fallback sample data
        jobsData = [
            {
                id: 1,
                title: "Senior Frontend Developer",
                company: "TechCorp",
                location: "san-francisco",
                type: "full-time",
                category: "technology",
                salary: "$120k - $160k",
                posted: "2 days ago",
                description: "We're looking for an experienced Frontend Developer...",
                requirements: ["5+ years of experience with React.js", "Strong knowledge of HTML, CSS, and JavaScript"],
                responsibilities: ["Develop and maintain web applications", "Collaborate with design and backend teams"],
                tags: ["React", "JavaScript", "CSS", "TypeScript"]
            }
        ];
    }
    renderJobsTable();
}

// Setup event listeners
function setupEventListeners() {
    // Add job button
    document.getElementById('addJobBtn').addEventListener('click', openAddJobModal);

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    // Job form submission
    document.getElementById('jobForm').addEventListener('submit', handleJobSubmit);

    // Cancel buttons
    document.getElementById('cancelBtn').addEventListener('click', closeModals);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeModals);

    // Delete confirmation
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeleteJob);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModals();
            }
        });
    });
}

// Update dashboard statistics
function updateDashboardStats() {
    const totalJobs = jobsData.length;
    const companies = [...new Set(jobsData.map(job => job.company))].length;
    const locations = [...new Set(jobsData.map(job => job.location))].length;
    const categories = [...new Set(jobsData.map(job => job.category))].length;

    document.getElementById('totalJobs').textContent = totalJobs;
    document.getElementById('totalCompanies').textContent = companies;
    document.getElementById('totalLocations').textContent = locations;
    document.getElementById('totalCategories').textContent = categories;
}

// Render jobs table
function renderJobsTable() {
    const tbody = document.getElementById('jobsTableBody');
    tbody.innerHTML = '';

    jobsData.forEach(job => {
        const row = document.createElement('tr');

        // Format location and type for display
        const locationDisplay = job.location === 'remote' ? 'Remote' :
                              job.location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const typeDisplay = job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const categoryDisplay = job.category.replace(/\b\w/g, l => l.toUpperCase());

        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${locationDisplay}</td>
            <td>${typeDisplay}</td>
            <td>${categoryDisplay}</td>
            <td>${job.posted}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editJob(${job.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn btn-delete" onclick="deleteJob(${job.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Open add job modal
function openAddJobModal() {
    currentEditingJob = null;
    document.getElementById('modalTitle').textContent = 'Add New Job';
    document.getElementById('jobForm').reset();
    document.getElementById('jobModal').style.display = 'block';
}

// Edit job
function editJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    currentEditingJob = job;

    // Populate form
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('jobCompany').value = job.company;
    document.getElementById('jobLocation').value = job.location;
    document.getElementById('jobType').value = job.type;
    document.getElementById('jobCategory').value = job.category;
    document.getElementById('jobSalary').value = job.salary;
    document.getElementById('jobDescription').value = job.description;
    document.getElementById('jobRequirements').value = job.requirements.join('\n');
    document.getElementById('jobResponsibilities').value = job.responsibilities.join('\n');
    document.getElementById('jobTags').value = job.tags.join(', ');

    document.getElementById('modalTitle').textContent = 'Edit Job';
    document.getElementById('jobModal').style.display = 'block';
}

// Handle job form submission
function handleJobSubmit(event) {
    event.preventDefault();

    const formData = {
        title: document.getElementById('jobTitle').value.trim(),
        company: document.getElementById('jobCompany').value.trim(),
        location: document.getElementById('jobLocation').value,
        type: document.getElementById('jobType').value,
        category: document.getElementById('jobCategory').value,
        salary: document.getElementById('jobSalary').value.trim(),
        description: document.getElementById('jobDescription').value.trim(),
        requirements: document.getElementById('jobRequirements').value.trim().split('\n').filter(r => r.trim()),
        responsibilities: document.getElementById('jobResponsibilities').value.trim().split('\n').filter(r => r.trim()),
        tags: document.getElementById('jobTags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (currentEditingJob) {
        // Update existing job
        Object.assign(currentEditingJob, formData);
        showNotification('Job updated successfully!', 'success');
    } else {
        // Add new job
        const newJob = {
            ...formData,
            id: Math.max(...jobsData.map(j => j.id), 0) + 1,
            posted: 'Just now'
        };
        jobsData.push(newJob);
        showNotification('Job added successfully!', 'success');
    }

    // Update main site's data if available
    if (typeof window.jobsData !== 'undefined') {
        window.jobsData = [...jobsData];
    }

    renderJobsTable();
    updateDashboardStats();
    closeModals();
}

// Delete job
function deleteJob(jobId) {
    jobToDelete = jobId;
    document.getElementById('deleteModal').style.display = 'block';
}

// Confirm delete job
function confirmDeleteJob() {
    if (!jobToDelete) return;

    const index = jobsData.findIndex(job => job.id === jobToDelete);
    if (index !== -1) {
        jobsData.splice(index, 1);

        // Update main site's data if available
        if (typeof window.jobsData !== 'undefined') {
            window.jobsData = [...jobsData];
        }

        renderJobsTable();
        updateDashboardStats();
        showNotification('Job deleted successfully!', 'success');
    }

    closeModals();
    jobToDelete = null;
}

// Close all modals
function closeModals() {
    document.getElementById('jobModal').style.display = 'none';
    document.getElementById('deleteModal').style.display = 'none';
    currentEditingJob = null;
    jobToDelete = null;
    document.getElementById('jobForm').reset();
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Add notification styles dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-white);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    border-left: 4px solid var(--primary-color);
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: var(--success-color);
}

.notification i {
    font-size: 1.25rem;
    color: var(--primary-color);
}

.notification-success i {
    color: var(--success-color);
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);