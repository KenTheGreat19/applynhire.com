# Enterprise Project Structure

## Overview

ApplyNHire has been reorganized to follow enterprise-level best practices with clear separation of concerns, comprehensive testing, and production-ready configuration.

## Directory Structure

```
applynhire.com/
│
├── 📁 src/                          # Frontend Source Code
│   ├── components/                   # UI Components
│   │   ├── header.ts                 # Navigation component
│   │   └── jobDetail.ts              # Job detail component
│   │
│   ├── services/                     # Business Logic & API
│   │   ├── jobService.ts             # Job-related operations
│   │   └── authService.ts            # Authentication operations
│   │
│   ├── utils/                        # Utility Functions
│   │   ├── formParser.ts             # Form parsing utilities
│   │   └── authUtils.ts              # Auth helper functions
│   │
│   ├── types/                        # TypeScript Definitions
│   │   └── index.ts                  # All type definitions
│   │
│   └── config/                       # Frontend Configuration
│
├── 📁 public/                        # Static Assets
│   ├── index.html                    # Main landing page
│   │
│   ├── pages/                        # HTML Pages
│   │   ├── auth.html
│   │   ├── signin.html
│   │   ├── signup.html
│   │   ├── employer-signin.html
│   │   ├── employer-signup.html
│   │   ├── employer.html
│   │   ├── applicant.html
│   │   ├── applicant-dashboard.html
│   │   ├── job-detail.html
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── cookies.html
│   │
│   └── assets/                       # Static Resources
│       ├── css/                      # Stylesheets
│       │   └── styles.css
│       ├── images/                   # Images
│       └── vendor/                   # Third-party libraries
│           ├── leaflet.js
│           └── leaflet.css
│
├── 📁 backend/                       # Python FastAPI Backend
│   │
│   ├── api/                          # API Layer
│   │   ├── __init__.py
│   │   └── routers/                  # Route Handlers
│   │       ├── __init__.py
│   │       ├── auth.py               # Auth endpoints
│   │       └── jobs.py               # Job endpoints
│   │
│   ├── core/                         # Core Configuration
│   │   ├── __init__.py
│   │   └── config.py                 # App settings
│   │
│   ├── db/                           # Database Layer
│   │   ├── __init__.py
│   │   └── database.py               # DB connection & session
│   │
│   ├── services/                     # Business Logic
│   │   ├── __init__.py
│   │   ├── auth_service.py           # Auth business logic
│   │   └── user_service.py           # User operations
│   │
│   ├── models.py                     # Data Models
│   ├── auth.py                       # Legacy auth (kept for compatibility)
│   ├── main.py                       # App entry point
│   ├── requirements.txt              # Python dependencies
│   └── README.md                     # Backend documentation
│
├── 📁 tests/                         # Test Suites
│   ├── conftest.py                   # Test configuration
│   ├── test_auth.py                  # Auth tests
│   └── test_jobs.py                  # Job tests
│
├── 📁 dist/                          # Build Output (generated)
│
├── 📁 docs/                          # Documentation
│   ├── PROJECT_STRUCTURE.md
│   ├── TYPESCRIPT_MIGRATION.md
│   ├── DESIGN_SYSTEM.md
│   └── ...
│
├── 📁 config/                        # Build Configuration
│   └── tsconfig.json                 # TypeScript config
│
├── 📁 .github/                       # GitHub Configuration
│   └── workflows/
│       └── ci.yml                    # CI/CD pipeline
│
├── 📄 package.json                   # NPM configuration
├── 📄 .gitignore                     # Git ignore rules
├── 📄 .env.example                   # Environment variables template
├── 📄 .editorconfig                  # Editor configuration
├── 📄 .prettierrc                    # Prettier configuration
├── 📄 .eslintrc.json                 # ESLint configuration
├── 📄 setup.cfg                      # Python tools configuration
├── 📄 vercel.json                    # Vercel deployment config
├── 📄 docker-compose.yml             # Docker configuration
├── 📄 Makefile                       # Build automation
├── 📄 README.md                      # Main documentation
├── 📄 CONTRIBUTING.md                # Contribution guidelines
├── 📄 CODE_OF_CONDUCT.md             # Code of conduct
├── 📄 LICENSE                        # MIT License
└── 📄 CHANGELOG.md                   # Version history
```

## Key Principles

### 1. Separation of Concerns
- **src/**: All TypeScript source code
- **public/**: Static assets and HTML pages
- **backend/**: Python API server
- **tests/**: Test suites
- **docs/**: Documentation

### 2. Modular Architecture

#### Frontend
- **Components**: Reusable UI components
- **Services**: API calls and business logic
- **Utils**: Helper functions
- **Types**: Type definitions

#### Backend
- **API Layer**: Route handlers (routers/)
- **Business Layer**: Services with business logic
- **Data Layer**: Models and database
- **Core**: Configuration and settings

### 3. Configuration Management
- Environment variables (`.env.example`)
- TypeScript config (`config/tsconfig.json`)
- Code quality (`.eslintrc.json`, `.prettierrc`)
- Editor settings (`.editorconfig`)

### 4. Testing Infrastructure
- Unit tests for backend (`tests/`)
- Test configuration (`conftest.py`)
- CI/CD pipeline (`.github/workflows/ci.yml`)

### 5. Documentation
- README with quick start
- API documentation
- Contributing guidelines
- Code of conduct

## Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

```typescript
import { Job } from '@types';
import { JobService } from '@services/jobService';
import { Header } from '@components/header';
import { parseForm } from '@utils/formParser';
```

## Build Process

1. **Development**: TypeScript files in `src/` are served directly
2. **Production**: TypeScript compiled to JavaScript in `dist/`
3. **Static Assets**: Served from `public/`

## API Structure

```
/api/v1
  /auth
    POST /signup      - Register user
    POST /signin      - Sign in user
    GET  /profile     - Get user profile
  /jobs
    GET    /          - List jobs (with filters)
    POST   /          - Create job (employer only)
    GET    /{id}      - Get job details
    PUT    /{id}      - Update job
    DELETE /{id}      - Delete job
```

## Environment Setup

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # Check TypeScript
npm run lint         # Lint code
npm run format       # Format code
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
pytest tests/ -v
```

## Benefits

### ✅ Enterprise-Ready
- Professional structure
- Scalable architecture
- Production-ready configuration

### ✅ Developer Experience
- Clear organization
- Easy to find files
- Path aliases for clean imports
- Comprehensive tooling

### ✅ Code Quality
- TypeScript strict mode
- ESLint and Prettier
- Testing infrastructure
- CI/CD pipeline

### ✅ Maintainability
- Separation of concerns
- Modular architecture
- Comprehensive documentation
- Version control best practices

### ✅ Collaboration
- Contributing guidelines
- Code of conduct
- Clear project structure
- Automated workflows

## Migration Notes

### From Old Structure
- `site/` → `src/` (TypeScript) + `public/` (HTML/Assets)
- `site/js/` → `src/components/`, `src/services/`, `src/utils/`
- `site/types.ts` → `src/types/index.ts`
- `site/pages/` → `public/pages/`
- `site/assets/` → `public/assets/`

### Backend Refactoring
- Monolithic `app.py` → Modular structure
- Added routers (`api/routers/`)
- Added services (`services/`)
- Added core config (`core/`)
- Proper database management (`db/`)

## Next Steps

1. **Update HTML imports**: Adjust script/style paths in HTML files
2. **Test the build**: Run `npm run build` and verify output
3. **Run tests**: Execute test suites
4. **Deploy**: Use CI/CD pipeline for deployment

---

**This is now an enterprise-grade project structure! 🎉**
