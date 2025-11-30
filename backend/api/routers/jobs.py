"""
Jobs router
"""
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime
from ...models import Job, JobCreate, JobRead
from ...db import get_session
from ...services import decode_access_token, UserService

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("", response_model=JobRead)
def create_job(
    job_in: JobCreate,
    user_id: str = Depends(decode_access_token),
    session: Session = Depends(get_session)
):
    """Create a new job (employers only)"""
    user = UserService.get_user_by_id(session, int(user_id))
    if user.role != "employer":
        raise HTTPException(status_code=403, detail="Must be an employer to create jobs")
    
    job = Job.from_orm(job_in)
    job.created_at = datetime.utcnow()
    job.posted_by = user.id
    session.add(job)
    session.commit()
    session.refresh(job)
    return job


@router.get("", response_model=List[JobRead])
def list_jobs(
    search: Optional[str] = None,
    location: Optional[str] = None,
    type: Optional[str] = None,
    category: Optional[str] = None,
    session: Session = Depends(get_session)
):
    """List all jobs with optional filters"""
    statement = select(Job)
    results = session.exec(statement).all()
    
    # Filter in memory for simplicity
    def matches(job: Job) -> bool:
        if search:
            term = search.lower()
            in_title = term in (job.title or "").lower()
            in_company = term in (job.company or "").lower()
            in_description = term in (job.description or "").lower() if job.description else False
            in_tags = any(term in t.lower() for t in (job.tags or []))
            if not (in_title or in_company or in_description or in_tags):
                return False
        if location and location.lower() not in (job.location or "").lower():
            return False
        if type and type != job.type:
            return False
        if category and category != job.category:
            return False
        return True
    
    return [j for j in results if matches(j)]


@router.get("/{job_id}", response_model=JobRead)
def get_job(job_id: int, session: Session = Depends(get_session)):
    """Get a specific job by ID"""
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=JobRead)
def update_job(
    job_id: int,
    job_in: JobCreate,
    user_id: str = Depends(decode_access_token),
    session: Session = Depends(get_session)
):
    """Update a job (must be owner)"""
    user = UserService.get_user_by_id(session, int(user_id))
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if user.role != "employer" or job.posted_by != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this job")
    
    for key, value in job_in.dict().items():
        setattr(job, key, value)
    
    session.add(job)
    session.commit()
    session.refresh(job)
    return job


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    user_id: str = Depends(decode_access_token),
    session: Session = Depends(get_session)
):
    """Delete a job (must be owner)"""
    user = UserService.get_user_by_id(session, int(user_id))
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if user.role != "employer" or job.posted_by != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this job")
    
    session.delete(job)
    session.commit()
    return {"detail": "Job deleted successfully"}


@router.get("/employer/my-jobs", response_model=List[JobRead])
def get_employer_jobs(
    user_id: str = Depends(decode_access_token),
    session: Session = Depends(get_session)
):
    """Get all jobs posted by the current employer"""
    user = UserService.get_user_by_id(session, int(user_id))
    if user.role != "employer":
        raise HTTPException(status_code=403, detail="Not an employer")
    
    statement = select(Job).where(Job.posted_by == user.id)
    return session.exec(statement).all()
