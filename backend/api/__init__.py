"""API module"""
from fastapi import APIRouter
from .routers import auth_router, jobs_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(jobs_router)

__all__ = ["api_router"]
