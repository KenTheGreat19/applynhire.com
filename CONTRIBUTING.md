# Contributing to ApplyNHire

Thank you for your interest in contributing to ApplyNHire! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/applynhire.com.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

## Code Standards

### Frontend (TypeScript)
- Follow TypeScript strict mode
- Use ESLint and Prettier configurations
- Write meaningful variable and function names
- Add JSDoc comments for complex functions

### Backend (Python)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Keep functions small and focused

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
pytest tests/ -v
```

## Code Review Process

1. All submissions require review
2. Automated CI/CD checks must pass
3. Maintain test coverage
4. Update documentation as needed

## Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Reference issues when applicable

Example:
```
Add user profile validation

- Add email format validation
- Add password strength requirements
- Update tests for validation logic

Fixes #123
```

## Pull Request Guidelines

- Fill out the PR template completely
- Link related issues
- Include screenshots for UI changes
- Update documentation
- Ensure all tests pass

## Questions?

Feel free to open an issue for questions or discussions.

Thank you for contributing! 🎉
