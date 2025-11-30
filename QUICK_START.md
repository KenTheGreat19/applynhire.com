# Quick Start Guide - ApplyNHire Enterprise Frontend

## 🚀 Getting Started (5 Minutes)

### Step 1: Update HTML

Replace your current CSS import with the new design system:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ApplyNHire - Find Jobs. Hire Talent. 100% Free.</title>
    
    <!-- NEW: Import modern design system -->
    <link rel="stylesheet" href="src/styles/main.css">
    
    <!-- Font Awesome (keep existing) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Your content here -->
    
    <!-- NEW: Import TypeScript module -->
    <script type="module" src="src/index.ts"></script>
</body>
</html>
```

### Step 2: Update Your HTML Structure

Ensure your header has the correct structure:

```html
<header class="site-header">
    <div class="container header-content">
        <div class="brand">
            <a href="/" class="site-logo">
                <img src="assets/images/logo.png" alt="ApplyNHire" class="site-logo-img">
                <span class="site-title">APPLY N HIRE</span>
            </a>
            <p class="tagline">Apply Job and Hire Talent for Free!</p>
        </div>
        
        <div class="header-actions">
            <!-- Language Selector -->
            <div class="language-selector">
                <button class="lang-btn" id="langBtn" 
                        aria-expanded="false" 
                        aria-haspopup="true">
                    <span class="flag-icon">🇬🇧</span>
                    <span class="sr-only">Change language</span>
                </button>
                <div class="lang-dropdown" id="langDropdown" aria-hidden="true">
                    <button class="lang-option" data-lang="en">
                        <span class="flag-icon">🇬🇧</span>
                        <span>English</span>
                    </button>
                    <button class="lang-option" data-lang="es">
                        <span class="flag-icon">🇪🇸</span>
                        <span>Español</span>
                    </button>
                </div>
            </div>
            
            <!-- Theme Toggle -->
            <button class="theme-toggle" id="themeToggle" 
                    aria-pressed="false"
                    aria-label="Switch to dark theme">
                <i class="fas fa-moon" aria-hidden="true"></i>
                <span class="sr-only">Toggle theme</span>
            </button>
            
            <!-- Navigation -->
            <a href="/applicant" class="btn-applicant">For Applicant</a>
            <a href="/employer" class="btn-employer">For Employers</a>
        </div>
    </div>
</header>
```

### Step 3: Use Services in Your Code

```typescript
// Import services
import { jobService } from './src/services/job.service';
import { SavedJobsStorage } from './src/services/storage.service';
import { formatRelativeTime, escapeHtml } from './src/utils/helpers';

// Fetch and display jobs
async function loadJobs() {
    const response = await jobService.fetchJobs();
    
    if (response.success && response.data) {
        displayJobs(response.data);
    }
}

// Display jobs with proper HTML escaping
function displayJobs(jobs) {
    const container = document.getElementById('jobsList');
    
    const html = jobs.map(job => `
        <div class="job-card card-interactive" data-job-id="${job.id}">
            <div class="job-card-header">
                <div class="job-title-section">
                    <h3 class="job-title">${escapeHtml(job.title)}</h3>
                    <div class="job-company">
                        <i class="fas fa-building"></i>
                        ${escapeHtml(job.company)}
                    </div>
                </div>
                <button class="btn-like ${SavedJobsStorage.has(job.id) ? 'liked' : ''}"
                        aria-label="Save job"
                        data-job-id="${job.id}">
                    <i class="fa${SavedJobsStorage.has(job.id) ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            
            <div class="job-meta">
                <div class="job-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    ${escapeHtml(job.location)}
                </div>
                <div class="job-meta-item">
                    <i class="fas fa-briefcase"></i>
                    ${job.type}
                </div>
            </div>
            
            <p class="job-description">${escapeHtml(job.description)}</p>
            
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
            
            <div class="job-footer">
                <div class="job-posted">
                    <i class="fas fa-clock"></i>
                    ${formatRelativeTime(job.posted)}
                </div>
                <button class="btn btn-primary btn-sm">
                    View Job
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Add event listeners
    attachJobCardListeners();
}

// Handle like button clicks
function attachJobCardListeners() {
    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jobId = parseInt(btn.dataset.jobId);
            
            if (SavedJobsStorage.has(jobId)) {
                SavedJobsStorage.remove(jobId);
                btn.classList.remove('liked');
                btn.querySelector('i').className = 'far fa-heart';
            } else {
                SavedJobsStorage.add(jobId);
                btn.classList.add('liked');
                btn.querySelector('i').className = 'fas fa-heart';
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadJobs);
```

## 🎨 Using Design Tokens

### In CSS
```css
.my-component {
    /* Colors */
    color: var(--color-text-primary);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border-primary);
    
    /* Spacing */
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-8);
    gap: var(--space-3);
    
    /* Typography */
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    
    /* Border Radius */
    border-radius: var(--radius-lg);
    
    /* Shadows */
    box-shadow: var(--shadow-md);
    
    /* Transitions */
    transition: var(--transition-base);
}

.my-component:hover {
    background: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### Color Semantic Tokens
```css
/* Primary actions */
var(--color-primary)
var(--color-primary-hover)
var(--color-primary-active)

/* Text colors */
var(--color-text-primary)      /* Main text */
var(--color-text-secondary)    /* Secondary text */
var(--color-text-tertiary)     /* Muted text */
var(--color-text-link)         /* Links */

/* Backgrounds */
var(--color-bg-primary)        /* Main background */
var(--color-bg-secondary)      /* Alternate background */
var(--color-bg-tertiary)       /* Subtle background */

/* Semantic states */
var(--color-success)
var(--color-warning)
var(--color-error)
var(--color-info)
```

## 🧩 Using Components

### Buttons
```html
<!-- Primary button -->
<button class="btn btn-primary">
    <i class="fas fa-check"></i>
    Submit
</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Outline button -->
<button class="btn btn-outline">Learn More</button>

<!-- Ghost button -->
<button class="btn btn-ghost">
    <i class="fas fa-times"></i>
</button>

<!-- Button sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Icon button -->
<button class="btn btn-primary btn-icon">
    <i class="fas fa-heart"></i>
</button>

<!-- Loading state -->
<button class="btn btn-primary btn-loading" disabled>
    Processing...
</button>
```

### Form Elements
```html
<!-- Input -->
<div class="stack-sm">
    <label class="label" for="email">Email</label>
    <input type="email" id="email" class="input" placeholder="you@example.com">
</div>

<!-- Input with icon -->
<div class="input-group">
    <i class="input-group-icon fas fa-search"></i>
    <input type="text" class="input" placeholder="Search...">
</div>

<!-- Select -->
<select class="select">
    <option value="">Choose an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</select>

<!-- Textarea -->
<textarea class="input textarea" placeholder="Your message..."></textarea>

<!-- Error state -->
<div class="stack-sm">
    <label class="label" for="password">Password</label>
    <input type="password" id="password" class="input input-error">
    <span class="field-error">Password is required</span>
</div>
```

### Cards
```html
<!-- Static card -->
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
        <p class="card-description">Card description text</p>
    </div>
    <p>Card content goes here...</p>
    <div class="card-footer">
        <button class="btn btn-primary">Action</button>
    </div>
</div>

<!-- Interactive card -->
<div class="card card-interactive">
    <h3 class="card-title">Clickable Card</h3>
    <p>This card has hover effects</p>
</div>
```

### Badges & Tags
```html
<!-- Badges -->
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Error</span>

<!-- Tags -->
<div class="job-tags">
    <span class="tag">React</span>
    <span class="tag">TypeScript</span>
    <span class="tag">Node.js</span>
</div>
```

### Alerts
```html
<div class="alert alert-info">
    <i class="alert-icon fas fa-info-circle"></i>
    <div class="alert-content">
        <div class="alert-title">Information</div>
        <p>This is an informational message</p>
    </div>
</div>

<div class="alert alert-success">
    <i class="alert-icon fas fa-check-circle"></i>
    <div class="alert-content">
        <div class="alert-title">Success</div>
        <p>Operation completed successfully!</p>
    </div>
</div>

<div class="alert alert-warning">
    <i class="alert-icon fas fa-exclamation-triangle"></i>
    <div class="alert-content">
        <div class="alert-title">Warning</div>
        <p>Please review before proceeding</p>
    </div>
</div>

<div class="alert alert-error">
    <i class="alert-icon fas fa-times-circle"></i>
    <div class="alert-content">
        <div class="alert-title">Error</div>
        <p>Something went wrong</p>
    </div>
</div>
```

## 📐 Layout Utilities

### Container
```html
<div class="container">
    <!-- Content automatically centered with max-width -->
</div>

<div class="container-fluid">
    <!-- Full width with padding -->
</div>
```

### Grid
```html
<!-- Auto-fit grid (responsive) -->
<div class="grid grid-auto-fit gap-6">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
</div>

<!-- Fixed columns -->
<div class="grid grid-cols-3 gap-4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

### Flexbox
```html
<!-- Basic flex -->
<div class="flex items-center justify-between gap-4">
    <div>Left</div>
    <div>Right</div>
</div>

<!-- Flex column -->
<div class="flex flex-col gap-3">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- Centered -->
<div class="flex items-center justify-center">
    <div>Centered content</div>
</div>
```

### Stack (Vertical Rhythm)
```html
<div class="stack">
    <h2>Heading</h2>
    <p>Paragraph with consistent spacing</p>
    <button class="btn btn-primary">Button</button>
</div>

<!-- Different spacing -->
<div class="stack-sm">Small spacing</div>
<div class="stack-md">Medium spacing (default)</div>
<div class="stack-lg">Large spacing</div>
<div class="stack-xl">Extra large spacing</div>
```

## 🎭 Accessibility Features

### Screen Reader Only Text
```html
<button aria-label="Close">
    <i class="fas fa-times" aria-hidden="true"></i>
    <span class="sr-only">Close dialog</span>
</button>
```

### ARIA Attributes (automatically handled by components)
```html
<!-- Dropdown -->
<button aria-expanded="false" aria-controls="menu">
    Menu
</button>
<div id="menu" aria-hidden="true">
    <!-- Menu items -->
</div>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="dialogTitle">
    <h2 id="dialogTitle">Dialog Title</h2>
    <!-- Dialog content -->
</div>
```

## 🎨 Dark Mode

Dark mode is automatically handled! Users can:
1. Toggle with the theme button in header
2. System preference is detected automatically
3. Preference is saved in localStorage

### Testing Dark Mode
```javascript
// Force dark mode
document.body.classList.add('dark-theme');
document.body.setAttribute('data-theme', 'dark');

// Force light mode
document.body.classList.remove('dark-theme');
document.body.setAttribute('data-theme', 'light');
```

## 📱 Responsive Classes

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>

<!-- Responsive grid -->
<div class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Responsive columns -->
</div>
```

## 🐛 Common Issues & Solutions

### Issue: Styles not applying
**Solution**: Ensure you're importing `src/styles/main.css` and not the old styles

### Issue: Components not initializing
**Solution**: Import the component file and ensure DOM is ready
```javascript
import './src/components/header.component';

// Or manually initialize
document.addEventListener('DOMContentLoaded', () => {
    // Your code
});
```

### Issue: TypeScript errors
**Solution**: Update your `tsconfig.json` to match `config/tsconfig.json`

### Issue: Dark mode not persisting
**Solution**: Component auto-loads theme from localStorage. Check browser console for errors.

## 📚 Next Steps

1. Read [`FRONTEND_ARCHITECTURE.md`](./FRONTEND_ARCHITECTURE.md) for deep dive
2. Read [`REFACTOR_SUMMARY.md`](./REFACTOR_SUMMARY.md) for what changed
3. Explore `src/styles/design-tokens.css` for all available tokens
4. Check `src/components/` for component examples
5. Review `src/services/` for API patterns

## 💬 Need Help?

Check the comprehensive documentation:
- **Architecture**: `FRONTEND_ARCHITECTURE.md`
- **Summary**: `REFACTOR_SUMMARY.md`
- **Quick Start**: This file

Happy coding! 🚀
