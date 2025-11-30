# ApplyNHire - Project Structure

## 📁 Organized File Structure

```
applynhire.com/
│
├── 📁 docs/                          # 📚 All Documentation
│   ├── README.md                      # Main project documentation
│   ├── TYPESCRIPT_MIGRATION.md        # TypeScript conversion guide
│   ├── TYPESCRIPT_SUMMARY.md          # Quick TypeScript reference
│   ├── DESIGN_IMPROVEMENTS.md         # Design guidelines
│   ├── DESIGN_SYSTEM.md               # Design system documentation
│   ├── IMPLEMENTATION_CHECKLIST.md    # Implementation tasks
│   └── TYPESCRIPT_MIGRATION.md        # TypeScript migration notes
│
├── 📁 config/                        # ⚙️ Configuration Files
│   └── tsconfig.json                  # TypeScript configuration
│
├── 📁 site/                          # 🌐 Frontend Application
│   │
│   ├── 📄 index.html                  # Main landing page
│   ├── 📄 types.ts                    # TypeScript type definitions
│   │
│   ├── 📁 pages/                      # 📄 HTML Pages
│   │   ├── auth.html                  # Authentication page
│   │   ├── signin.html                # Sign in page
│   │   ├── signup.html                # Sign up page
│   │   ├── employer-signin.html       # Employer sign in
│   │   ├── employer-signup.html       # Employer sign up
│   │   ├── employer.html              # Employer dashboard
│   │   ├── applicant.html             # Applicant sign up
│   │   ├── applicant-dashboard.html   # Applicant dashboard
│   │   ├── job-detail.html            # Job detail page
│   │   ├── privacy.html               # Privacy policy
│   │   ├── terms.html                 # Terms of service
│   │   ├── cookies.html               # Cookie policy
│   │   └── admin.html                 # Admin dashboard
│   │
│   ├── 📁 js/                         # 💻 TypeScript/JavaScript
│   │   ├── script.ts                  # Main job aggregator logic
│   │   ├── header.ts                  # Navigation & mobile menu
│   │   ├── auth-common.ts             # Form parsing utilities
│   │   ├── auth-forms.ts              # Authentication logic
│   │   ├── job-detail.ts              # Job detail functionality
│   │   └── siteAuth.ts                # Auth utilities
│   │
│   └── 📁 assets/                     # 🎨 Static Assets
│       │
│       ├── 📁 css/                    # Stylesheets
│       │   └── styles.css             # Main stylesheet
│       │
│       └── 📁 vendor/                 # Third-party libraries
│           ├── leaflet.css            # Leaflet map styles
│           ├── leaflet.js             # Leaflet map library
│           └── 📁 images/             # Vendor images
│               ├── logo.png
│               └── logo.svg
│
├── 📁 backend/                       # 🐍 Python Backend (FastAPI)
│   ├── __init__.py
│   ├── app.py                         # Main FastAPI application
│   ├── models.py                      # Database models
│   ├── auth.py                        # Authentication logic
│   ├── import_demo.py                 # Demo data import
│   ├── requirements.txt               # Python dependencies
│   ├── README.md                      # Backend documentation
│   └── 📁 __pycache__/               # Python cache
│
├── 📁 node_modules/                  # 📦 NPM Dependencies (auto-generated)
│
├── 📄 package.json                    # NPM configuration
├── 📄 package-lock.json               # NPM lock file
└── 📄 .gitignore                      # Git ignore rules

```

## 🎯 Folder Purposes

### 📚 `docs/`
**All Documentation Files**
- Project README
- TypeScript migration guides
- Design system documentation
- Implementation checklists
- Any `.md` (Markdown) files

### ⚙️ `config/`
**Configuration Files**
- `tsconfig.json` - TypeScript compiler configuration
- Future: ESLint, Prettier, or other tool configs

### 🌐 `site/`
**Frontend Application Root**

#### 📄 `site/pages/`
All HTML pages except the main landing page:
- Authentication pages (signin, signup)
- User dashboards (applicant, employer)
- Information pages (privacy, terms, cookies)
- Admin pages

#### 💻 `site/js/`
All TypeScript source files:
- Business logic
- UI interactions
- API calls
- Authentication

#### 🎨 `site/assets/`
Static resources:
- **css/** - Stylesheets
- **vendor/** - Third-party libraries (Leaflet, etc.)
- **images/** - Future: your own images

### 🐍 `backend/`
Python FastAPI backend:
- API endpoints
- Database models
- Authentication
- Business logic

## 📋 Path Updates

### HTML File References
All HTML files in `site/pages/` now reference:
- CSS: `../assets/css/styles.css`
- JS: `../js/*.ts`
- Images: `../assets/vendor/images/*`

### TypeScript Configuration
`config/tsconfig.json` updated with:
- `baseUrl: ".."` (points to project root)
- `paths: {"@/*": ["../site/*"]}` (module aliases)

### NPM Scripts
`package.json` updated:
```json
"type-check": "tsc --project config/tsconfig.json --noEmit"
"build": "tsc --project config/tsconfig.json"
```

## 🚀 Commands

### Development
```bash
# Start frontend dev server
npm run dev
# Opens http://localhost:8080

# Start backend API
cd backend
python -m uvicorn app:app --host 0.0.0.0 --port 8000
# API at http://127.0.0.1:8000
```

### Type Checking
```bash
# Check TypeScript types
npm run type-check
```

### Build
```bash
# Compile TypeScript (optional)
npm run build
```

## 📝 Benefits of This Structure

### ✅ Clean Separation
- Documentation separate from code
- Configuration files in one place
- Assets organized by type

### ✅ Scalability
- Easy to add new pages in `site/pages/`
- Clear location for new assets
- Documentation stays organized

### ✅ Maintainability
- Easy to find files
- Logical folder hierarchy
- Professional project structure

### ✅ Professional
- Industry-standard organization
- Clear purpose for each folder
- Easy for new developers to understand

## 🔍 Finding Files

| What you need | Where to look |
|---------------|---------------|
| Documentation | `docs/` |
| Configuration | `config/` |
| Landing page | `site/index.html` |
| Other pages | `site/pages/` |
| JavaScript/TypeScript | `site/js/` |
| Types | `site/types.ts` |
| Styles | `site/assets/css/` |
| Images | `site/assets/vendor/images/` |
| Backend API | `backend/` |

## 📚 Documentation Files

All documentation now in `docs/`:
- `README.md` - Project overview
- `TYPESCRIPT_MIGRATION.md` - Full TypeScript guide
- `TYPESCRIPT_SUMMARY.md` - Quick reference
- `DESIGN_IMPROVEMENTS.md` - Design guidelines
- `DESIGN_SYSTEM.md` - Design system
- `IMPLEMENTATION_CHECKLIST.md` - Task checklist

## ✨ Next Steps

1. **Update HTML References** - Verify all paths work correctly
2. **Test the Application** - Run `npm run dev` and test all pages
3. **Update Documentation** - Add any new docs to `docs/` folder
4. **Add .gitignore** - Exclude `node_modules/`, `__pycache__/`, etc.

Your project is now professionally organized! 🎉
