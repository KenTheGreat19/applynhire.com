# Job Aggregator Website

A modern, responsive job aggregator website built with HTML, CSS, and vanilla JavaScript. This application allows users to search and filter job listings across various categories, locations, and employment types.

## Features

- 🔍 **Real-time Search** - Search jobs by title, company, or keywords
- 🎯 **Advanced Filtering** - Filter by location, job type, and category
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 💼 **Job Details Modal** - View detailed job information with requirements and responsibilities
- 🏷️ **Tag System** - Quick skill identification with tag-based filtering
- ⚡ **Fast Performance** - No external dependencies, pure vanilla JavaScript
- 🎨 **Modern UI** - Clean and professional design with smooth animations

## Demo

The website includes 12 sample job listings across different industries:
- Technology (Frontend, Backend, Full Stack, DevOps, Mobile)
- Design (UX/UI)
- Marketing (Marketing Manager, Content Writer)
- Sales (Sales Executive)
- Finance (Financial Analyst)

## Getting Started

### Prerequisites

No special prerequisites needed! Just a modern web browser.

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/KenTheGreat19/Project-1.1.git
cd Project-1.1
```

2. Open `site/index.html` in your web browser (root `index.html` redirects here):
```bash
# On Linux
xdg-open site/index.html

# On macOS
open site/index.html

# On Windows
start site/index.html
```

Or simply double-click the `index.html` file.

### Auth Demo

There is a client-side sign in / sign up demo available. It stores demo accounts in `localStorage` and redirects based on the chosen role.

 - Open `signin.html` to access Sign In or `signup.html` to create a new account.
 - For employers, use `employer-signin.html` and `employer-signup.html` to sign in/up specifically for employer accounts.
 - After signing in or signing up, you'll be redirected to `applicant.html` or `employer.html` depending on the role created.

### Responsive header

- The header now has a compact layout: the logo is flush to the left and the auth links (Sign in / Sign up / Employer site) appear on the right as a button and links.
- On small screens, the auth links collapse into a dropdown menu accessible via a hamburger toggle. This keeps the header compact while preserving the links.

Note: This is a frontend-only demo for educational purposes; do not rely on it for production authentication.

### Running with a Local Server (Optional)

For a better development experience, you can use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## Project Structure

```
Project-1.1/
├── site/            # All website content (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── signin.html
│   ├── signup.html
│   ├── employer-signin.html
│   ├── employer-signup.html
│   ├── auth-common.js
│   ├── auth-forms.js   # Consolidated sign-in/up logic replacing signin.js, signup.js, employer-* files
│   ├── applicant.html
│   ├── employer.html
│   └── siteAuth.js
├── README.md         # This file
└── tests/            # Unit/integration tests
```

## Migration Notes

- The primary site files (HTML/CSS/JS) were moved into the `site/` directory for better organization.
- A consolidated auth script (`site/auth-forms.js`) replaces the multiple per-page auth scripts to reduce duplication.
- Root HTML files now redirect to `site/` equivalents to retain backward compatibility while keeping the project structure tidy.
- Legacy root JS files are kept for reference but should not be used; new code runs from under `site/`.


## Features Breakdown

### Search Functionality
- Real-time search as you type
- Searches across job titles, companies, descriptions, and tags
- Case-insensitive matching

### Filtering Options
- **Location Filter**: Remote, New York, San Francisco, London, Berlin
- **Job Type Filter**: Full Time, Part Time, Contract, Internship
- **Category Filter**: Technology, Design, Marketing, Sales, Finance

### Job Cards
Each job card displays:
- Company logo (generated from company name)
- Job title and company name
- Location, job type, and category
- Brief description
- Skill tags
- Salary range
- Posted date

### Job Detail Modal
Clicking on any job card opens a detailed view with:
- Full job description
- Requirements list
- Responsibilities list
- Skills and tags
- Apply button (placeholder)

## Customization

### Adding New Jobs

Edit the `jobsData` array in `script.js`:

```javascript
const jobsData = [
    {
        id: 13,
        title: "Your Job Title",
        company: "Company Name",
        location: "Location",
        type: "full-time", // full-time, part-time, contract, internship
        category: "technology", // technology, design, marketing, sales, finance
        salary: "$80k - $100k",
        posted: "1 day ago",
        description: "Job description here...",
        requirements: [
            "Requirement 1",
            "Requirement 2"
        ],
        responsibilities: [
            "Responsibility 1",
            "Responsibility 2"
        ],
        tags: ["Tag1", "Tag2", "Tag3"]
    },
    // ... more jobs
];
```

### Connecting to a Real API

Uncomment and modify the `fetchJobsFromAPI()` function in `script.js`:

```javascript
async function fetchJobsFromAPI() {
    try {
        loading.style.display = 'block';
        jobsList.style.display = 'none';
        
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        // Transform API data to match the jobsData structure if needed
        jobsData = data;
        
        loading.style.display = 'none';
        renderJobs(jobsData);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        loading.style.display = 'none';
        noResults.style.display = 'block';
    }
}

// Call this instead of init()
fetchJobsFromAPI();
```

### Styling Customization

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary brand color */
    --success-color: #10b981;      /* Success/positive actions */
    --warning-color: #f59e0b;      /* Warnings */
    --danger-color: #ef4444;       /* Errors/negative actions */
    --text-primary: #1f2937;       /* Main text color */
    --text-secondary: #6b7280;     /* Secondary text color */
    --bg-light: #f9fafb;           /* Light background */
    --bg-white: #ffffff;           /* White background */
    --border-color: #e5e7eb;       /* Border color */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Enhancements

Potential features to add:
- [ ] Backend API integration
- [ ] User authentication and saved jobs
- [ ] Job application tracking
- [ ] Email alerts for new jobs
- [ ] Advanced search with salary range
- [ ] Company profiles
- [ ] Job posting functionality for employers
- [ ] Dark mode toggle
- [ ] Pagination for large datasets
- [ ] Export job listings to PDF/CSV
- [ ] Social media sharing

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**KenTheGreat19**

## Acknowledgments

- Font Awesome for icons
- Inspiration from modern job boards like Indeed, LinkedIn Jobs, and AngelList

---

**Note**: This is a frontend-only demo. For production use, you'll need to:
1. Connect to a real job listings API
2. Implement proper backend authentication
3. Add database integration
4. Set up actual job application processing
5. Implement security measures (input sanitization, etc.)