# ApplyNHire - Job Aggregator Platform

> Free job posting and application platform built with TypeScript and FastAPI

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev
# Opens http://localhost:8080

# Start backend (separate terminal)
cd backend
python -m uvicorn app:app --host 0.0.0.0 --port 8000
# API at http://127.0.0.1:8000
```

## 📁 Project Structure

```
applynhire.com/
├── 📚 docs/              # All documentation
├── ⚙️  config/           # Configuration files
├── 🌐 site/             # Frontend application
│   ├── pages/           # HTML pages
│   ├── js/              # TypeScript source
│   └── assets/          # CSS, images, vendor files
├── 🐍 backend/          # Python FastAPI backend
└── 📦 node_modules/     # NPM dependencies
```

**See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed structure.**

## 📚 Documentation

All documentation is in the `docs/` folder:

- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Complete project organization
- **[TYPESCRIPT_MIGRATION.md](docs/TYPESCRIPT_MIGRATION.md)** - TypeScript conversion guide
- **[TYPESCRIPT_SUMMARY.md](docs/TYPESCRIPT_SUMMARY.md)** - Quick TypeScript reference
- **[ORGANIZATION_COMPLETE.md](docs/ORGANIZATION_COMPLETE.md)** - Organization summary
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Design system guidelines
- **[DESIGN_IMPROVEMENTS.md](docs/DESIGN_IMPROVEMENTS.md)** - Design enhancements
- **[IMPLEMENTATION_CHECKLIST.md](docs/IMPLEMENTATION_CHECKLIST.md)** - Task checklist

## 🛠️ Technology Stack

### Frontend
- **TypeScript** - Type-safe JavaScript
- **HTML5/CSS3** - Modern web standards
- **Leaflet** - Interactive maps
- **ES Modules** - Native browser modules

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **Pydantic** - Data validation
- **SQLite** - Database

## 📦 NPM Scripts

```bash
# Type check TypeScript
npm run type-check

# Build TypeScript (optional)
npm run build

# Start dev server
npm run dev
```

## ✨ Features

- ✅ **Job Listings** - Browse 12+ sample jobs
- ✅ **Search & Filter** - By keyword, location, type, category
- ✅ **Authentication** - Sign in/sign up for applicants and employers
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Type Safety** - Full TypeScript support
- ✅ **API Ready** - FastAPI backend integration

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `site/index.html` | Main landing page |
| `site/types.ts` | TypeScript type definitions |
| `site/js/script.ts` | Job aggregator logic |
| `backend/app.py` | FastAPI server |
| `config/tsconfig.json` | TypeScript configuration |

## 📖 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/KenTheGreat19/applynhire.com.git
   cd applynhire.com
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   cd backend && python -m uvicorn app:app --host 0.0.0.0 --port 8000
   ```

5. **Open your browser**
   - Frontend: http://localhost:8080
   - Backend API: http://127.0.0.1:8000
   - API Docs: http://127.0.0.1:8000/docs

## 🧪 Development

### Type Checking
```bash
npm run type-check
```

### Adding New Features

- **New page**: Add to `site/pages/`
- **New TypeScript**: Add to `site/js/`
- **New styles**: Add to `site/assets/css/`
- **New docs**: Add to `docs/`

### Code Structure

```typescript
// site/types.ts - Define types
export interface Job {
  id: number;
  title: string;
  company: string;
  // ...
}

// site/js/script.ts - Use types
import type { Job } from '../types';

const jobs: Job[] = [
  { id: 1, title: "Developer", ... }
];
```

## 🏗️ Project Organization

✅ **Clean Structure** - Professional folder organization  
✅ **Documentation** - All docs in `docs/` folder  
✅ **Configuration** - Centralized in `config/`  
✅ **Type Safety** - Full TypeScript support  
✅ **Scalable** - Easy to extend and maintain  

## 🤝 Contributing

1. Read the documentation in `docs/`
2. Follow the existing code structure
3. Use TypeScript for all new code
4. Test your changes locally
5. Submit pull requests

## 📝 License

This project is free and open source.

## 🔗 Links

- **Repository**: https://github.com/KenTheGreat19/applynhire.com
- **Issues**: https://github.com/KenTheGreat19/applynhire.com/issues
- **Documentation**: [docs/](docs/)

## 💡 Need Help?

- Check [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for structure details
- See [docs/TYPESCRIPT_SUMMARY.md](docs/TYPESCRIPT_SUMMARY.md) for TypeScript help
- Review [docs/ORGANIZATION_COMPLETE.md](docs/ORGANIZATION_COMPLETE.md) for organization info

---

**Built with ❤️ using TypeScript and FastAPI**
