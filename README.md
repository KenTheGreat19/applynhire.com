# ApplyNHire - Enterprise Job Platform

[![CI/CD](https://github.com/KenTheGreat19/applynhire.com/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/KenTheGreat19/applynhire.com/actions)

> Professional job aggregator platform built with TypeScript and FastAPI

## 🏗️ Enterprise Architecture

This project follows enterprise-level best practices with clear separation of concerns, comprehensive testing, and production-ready configuration.

```
applynhire.com/
├── 📁 src/                  # Frontend source code
│   ├── components/          # UI components
│   ├── services/            # Business logic & API calls
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript definitions
│   └── config/              # App configuration
├── 📁 public/               # Static assets & HTML
│   ├── pages/               # HTML pages
│   └── assets/              # CSS, images, vendor libs
├── 📁 backend/              # Python FastAPI backend
│   ├── api/                 # API routes
│   │   └── routers/         # Route handlers
│   ├── core/                # Core configuration
│   ├── db/                  # Database setup
│   ├── services/            # Business services
│   ├── models.py            # Data models
│   └── main.py              # App entry point
├── 📁 tests/                # Test suites
├── 📁 dist/                 # Build output
├── 📁 docs/                 # Documentation
├── 📁 config/               # Build configuration
└── 📁 .github/              # CI/CD workflows
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Python >= 3.10
- npm >= 9.0.0

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### Development

```bash
# Terminal 1: Start frontend dev server
npm run dev
# Opens at http://localhost:8080

# Terminal 2: Start backend API
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# API at http://127.0.0.1:8000
# Docs at http://127.0.0.1:8000/docs
```

## 📦 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run type-check` | Check TypeScript types |
| `npm run lint` | Lint TypeScript code |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests |
| `npm run clean` | Clean build directory |

## 🧪 Testing

```bash
# Frontend (coming soon)
npm test

# Backend
pytest tests/ -v

# With coverage
pytest tests/ --cov=backend --cov-report=html
```

## 📋 Features

### Frontend
- ✅ TypeScript for type safety
- ✅ Modular component architecture
- ✅ Centralized service layer
- ✅ ESLint & Prettier configured
- ✅ Path aliases (@components, @services, etc.)

### Backend
- ✅ FastAPI with async support
- ✅ SQLModel ORM
- ✅ JWT authentication
- ✅ Router-based architecture
- ✅ Service layer pattern
- ✅ Comprehensive testing
- ✅ API documentation (OpenAPI)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables:
- `JWT_SECRET_KEY` - Secret for JWT tokens
- `DATABASE_URL` - Database connection string
- `CORS_ORIGINS` - Allowed origins

### TypeScript Configuration

TypeScript is configured in `config/tsconfig.json` with:
- Strict mode enabled
- Path aliases configured
- Source maps for debugging
- ES2022 target

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

### Key Endpoints

**Authentication**
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/signin` - Sign in
- `GET /api/v1/auth/profile` - Get user profile

**Jobs**
- `GET /api/v1/jobs` - List jobs (with filters)
- `POST /api/v1/jobs` - Create job (employer only)
- `GET /api/v1/jobs/{id}` - Get job details
- `PUT /api/v1/jobs/{id}` - Update job
- `DELETE /api/v1/jobs/{id}` - Delete job

## 🏛️ Architecture Patterns

### Frontend
- **Components**: Reusable UI components
- **Services**: API integration & business logic
- **Utils**: Helper functions & utilities
- **Types**: Centralized TypeScript definitions

### Backend
- **Routers**: Route handlers grouped by feature
- **Services**: Business logic layer
- **Models**: Data models and schemas
- **Middleware**: Cross-cutting concerns
- **Core**: Application configuration

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation with Pydantic
- SQL injection prevention with SQLModel

## 🚢 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to static hosting
```

### Backend
```bash
# Production mode
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker (Coming Soon)
```bash
docker-compose up
```

## 📖 Documentation

Comprehensive documentation in the `docs/` folder:
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [TypeScript Guide](docs/TYPESCRIPT_MIGRATION.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [API Documentation](docs/API.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

Before submitting:
```bash
npm run lint:fix
npm run format
npm run type-check
pytest tests/
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by KenTheGreat19

## 🔗 Links

- [Repository](https://github.com/KenTheGreat19/applynhire.com)
- [Issues](https://github.com/KenTheGreat19/applynhire.com/issues)
- [Discussions](https://github.com/KenTheGreat19/applynhire.com/discussions)

---

**Enterprise-grade job platform - TypeScript + FastAPI**
