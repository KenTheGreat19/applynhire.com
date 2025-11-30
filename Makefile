# Makefile for ApplyNHire

.PHONY: help install dev build test clean lint format

help:
	@echo "ApplyNHire - Available Commands:"
	@echo "  make install         - Install all dependencies"
	@echo "  make dev             - Start development servers"
	@echo "  make build           - Build for production"
	@echo "  make test            - Run all tests"
	@echo "  make lint            - Lint code"
	@echo "  make format          - Format code"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make organize-docs   - Organize markdown files into documentation folder"

install:
	@echo "Installing frontend dependencies..."
	npm install
	@echo "Installing backend dependencies..."
	cd backend && pip install -r requirements.txt

dev-frontend:
	npm run dev

dev-backend:
	cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

build:
	@echo "Building project..."
	npm run build

test:
	@echo "Running frontend tests..."
	npm test
	@echo "Running backend tests..."
	pytest tests/ -v

lint:
	@echo "Linting frontend..."
	npm run lint
	@echo "Linting backend..."
	cd backend && flake8 .

format:
	@echo "Formatting frontend..."
	npm run format
	@echo "Formatting backend..."
	cd backend && black .

clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	rm -rf backend/__pycache__/
	rm -rf backend/**/__pycache__/
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

.PHONY: organize-docs
organize-docs:
	@bash scripts/organize-docs.sh
