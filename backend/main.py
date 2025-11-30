"""
ApplyNHire - Enterprise FastAPI Application
Main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .db import create_db_and_tables
from .api import api_router


def create_application() -> FastAPI:
    """Create and configure the FastAPI application"""
    
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json"
    )
    
    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include API router with prefix
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)
    
    # Startup event
    @app.on_event("startup")
    def on_startup():
        """Initialize database on startup"""
        create_db_and_tables()
    
    # Health check endpoint
    @app.get("/health")
    def health_check():
        """Health check endpoint"""
        return {
            "status": "healthy",
            "app": settings.APP_NAME,
            "version": settings.APP_VERSION
        }
    
    return app


# Create app instance
app = create_application()
