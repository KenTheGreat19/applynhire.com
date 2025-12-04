# ApplyNHire - Job Aggregator Platform

A modern job aggregator platform built with **Django** (Python) backend and **React** frontend, featuring intelligent job scraping with **Scrapy**.

## 🏗️ Architecture

```
applynhire.com/
├── backend/              # Django REST API
│   ├── apps/
│   │   ├── users/       # User authentication & profiles
│   │   ├── jobs/        # Job listings (MongoDB)
│   │   ├── payments/    # Subscriptions & payments
│   │   └── api/         # API routes
│   └── config/          # Django settings
├── frontend/            # React + TypeScript
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       ├── store/       # Zustand state management
│       └── types/       # TypeScript types
└── scraper/             # Scrapy job scraping
    └── spiders/         # Spider implementations
```

## 🛠️ Tech Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - User data, payments (relational integrity)
- **MongoDB** - Job listings (flexible schema)
- **Celery** - Background tasks
- **Redis** - Caching & task queue

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **Zustand** - State management
- **React Router** - Routing

### Scraping
- **Scrapy** - Web scraping framework
- **BeautifulSoup** - HTML parsing
- **Selenium/Playwright** - Dynamic content

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (recommended)
- PostgreSQL (if not using Docker)
- MongoDB (if not using Docker)

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/KenTheGreat19/applynhire.com.git
cd applynhire.com

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/api/docs/
```

### Option 2: Local Development

#### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

#### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

#### Scraper Setup

```bash
# Navigate to scraper
cd scraper

# Install dependencies
pip install -r requirements.txt

# Run a spider
scrapy crawl indeed -a query="software engineer" -a location="New York"
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Current user
- `GET /api/auth/profile/` - User profile

### Jobs
- `GET /api/v1/jobs/` - List jobs (with filters)
- `GET /api/v1/jobs/{id}/` - Job details
- `GET /api/v1/jobs/featured/` - Featured jobs
- `GET /api/v1/jobs/categories/` - Job categories
- `POST /api/v1/jobs/{id}/apply/` - Apply to job
- `POST /api/v1/jobs/{id}/save/` - Save/unsave job
- `GET /api/v1/jobs/user/applications/` - User's applications
- `GET /api/v1/jobs/user/saved/` - User's saved jobs

## 🔧 Environment Variables

### Backend (.env)
```env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# PostgreSQL
POSTGRES_DB=applynhire
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# MongoDB
MONGODB_URI=mongodb://localhost:27017/applynhire
MONGODB_DB=applynhire

# Redis
REDIS_URL=redis://localhost:6379/0

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Frontend (.env)
```env
VITE_API_URL=/api/v1
VITE_AUTH_URL=/api/auth
```

## 🕷️ Running Scrapers

```bash
cd scraper

# Scrape Indeed jobs
scrapy crawl indeed -a query="python developer" -a location="Remote" -a pages=5

# Scrape LinkedIn jobs (educational purposes)
scrapy crawl linkedin -a keywords="data scientist" -a location="San Francisco"

# Run all spiders
python run_scraper.py indeed
```

## 📦 Project Structure Details

### Backend Apps

- **users**: Custom user model, authentication, profiles (employer/applicant)
- **jobs**: MongoDB-based job listings, applications, saved jobs
- **payments**: Subscription plans, payments, invoices (Stripe)
- **api**: Central API routing

### Frontend Structure

- **components/**: Reusable UI (Header, Footer, JobCard, SearchBar)
- **pages/**: Route pages (Home, Jobs, JobDetail, Login, Register, Dashboard)
- **services/**: API client with axios
- **store/**: Zustand stores (auth)
- **types/**: TypeScript interfaces

## 🧪 Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm run test
```

## 🚀 Deployment

### Production Checklist

1. Set `DEBUG=False` in Django settings
2. Configure proper `ALLOWED_HOSTS`
3. Use strong `DJANGO_SECRET_KEY`
4. Set up SSL/TLS certificates
5. Configure production databases
6. Set up proper logging
7. Configure Stripe for live payments
8. Set up monitoring (Sentry, etc.)

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
