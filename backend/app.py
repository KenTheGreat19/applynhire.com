from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, select
from .models import User, UserCreate, UserRead, UserLogin, Job, JobCreate, JobRead, Application, ApplicationCreate, ApplicationRead
from .auth import get_password_hash, verify_password, create_access_token, decode_access_token
from datetime import datetime
import os

DB_FILE = os.path.join(os.path.dirname(__file__), 'db.sqlite')
DATABASE_URL = f"sqlite:///{DB_FILE}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI(title="Job Aggregator - Backend (FastAPI)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post('/api/signup', response_model=UserRead)
def signup(user_in: UserCreate):
    with Session(engine) as session:
        statement = select(User).where(User.email == user_in.email)
        existing = session.exec(statement).first()
        if existing:
            raise HTTPException(status_code=400, detail='Email already registered')
        user = User.from_orm(user_in)
        user.hashed_password = get_password_hash(user_in.password)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user


@app.post('/api/signin')
def signin(credentials: UserLogin):
    with Session(engine) as session:
        statement = select(User).where(User.email == credentials.email)
        user = session.exec(statement).first()
        if not user or (not verify_password(credentials.password, user.hashed_password)):
            raise HTTPException(status_code=401, detail='Invalid email or password')
        token = create_access_token({"sub": str(user.id)})
        return {"access_token": token, "token_type": "bearer", "user": UserRead.from_orm(user)}


@app.get('/api/profile', response_model=UserRead)
def profile(token: str = Depends(decode_access_token)):
    # decode_access_token returns the user id (sub) and fetch user
    user_id = token
    with Session(engine) as session:
        statement = select(User).where(User.id == int(user_id))
        user = session.exec(statement).first()
        if not user:
            raise HTTPException(status_code=404, detail='User not found')
        return user


# --- Helper: get user by id from token id
def get_user_by_id(user_id: str):
    with Session(engine) as session:
        statement = select(User).where(User.id == int(user_id))
        return session.exec(statement).first()


@app.post('/api/jobs', response_model=JobRead)
def create_job(job_in: JobCreate, token: str = Depends(decode_access_token)):
    user_id = token
    user = get_user_by_id(user_id)
    if not user or user.role != 'employer':
        raise HTTPException(status_code=403, detail='Must be an employer to create jobs')
    with Session(engine) as session:
        job = Job.from_orm(job_in)
        job.created_at = datetime.utcnow()
        job.posted_by = user.id
        session.add(job)
        session.commit()
        session.refresh(job)
        return job


@app.get('/api/jobs', response_model=list[JobRead])
def list_jobs(search: str | None = None, location: str | None = None, type: str | None = None, category: str | None = None):
    with Session(engine) as session:
        statement = select(Job)
        results = session.exec(statement).all()
        # Filter in memory for simplicity; fine for small demo
        def matches(job: Job):
            if search:
                term = search.lower()
                in_title = term in (job.title or '').lower()
                in_company = term in (job.company or '').lower()
                in_description = term in (job.description or '').lower() if job.description else False
                in_tags = any(term in t.lower() for t in (job.tags or []))
                if not (in_title or in_company or in_description or in_tags):
                    return False
            if location and location.lower() not in (job.location or '').lower():
                return False
            if type and type != job.type:
                return False
            if category and category != job.category:
                return False
            return True
        filtered = [j for j in results if matches(j)]
        return filtered


@app.get('/api/jobs/{job_id}', response_model=JobRead)
def get_job(job_id: int):
    with Session(engine) as session:
        statement = select(Job).where(Job.id == job_id)
        job = session.exec(statement).first()
        if not job:
            raise HTTPException(status_code=404, detail='Job not found')
        return job


@app.put('/api/jobs/{job_id}', response_model=JobRead)
def update_job(job_id: int, job_in: JobCreate, token: str = Depends(decode_access_token)):
    user_id = token
    user = get_user_by_id(user_id)
    with Session(engine) as session:
        statement = select(Job).where(Job.id == job_id)
        job = session.exec(statement).first()
        if not job:
            raise HTTPException(status_code=404, detail='Job not found')
        if user.role != 'employer' or job.posted_by != user.id:
            raise HTTPException(status_code=403, detail='Not authorized to update this job')
        for key, value in job_in.dict().items():
            setattr(job, key, value)
        session.add(job)
        session.commit()
        session.refresh(job)
        return job


@app.delete('/api/jobs/{job_id}')
def delete_job(job_id: int, token: str = Depends(decode_access_token)):
    user_id = token
    user = get_user_by_id(user_id)
    with Session(engine) as session:
        statement = select(Job).where(Job.id == job_id)
        job = session.exec(statement).first()
        if not job:
            raise HTTPException(status_code=404, detail='Job not found')
        if user.role != 'employer' or job.posted_by != user.id:
            raise HTTPException(status_code=403, detail='Not authorized to delete this job')
        session.delete(job)
        session.commit()
        return {"detail": "Deleted"}


@app.post('/api/jobs/{job_id}/apply', response_model=ApplicationRead)
def apply_job(job_id: int, application: ApplicationCreate, token: str | None = Depends(decode_access_token)):
    # token optional: allow anonymous application if no token
    applicant_id = None
    if token:
        applicant_id = int(token)
    with Session(engine) as session:
        # verify job exists
        statement = select(Job).where(Job.id == job_id)
        job = session.exec(statement).first()
        if not job:
            raise HTTPException(status_code=404, detail='Job not found')
        app_obj = Application(job_id=job_id, applicant_id=applicant_id, name=application.name, email=application.email, cover_letter=application.cover_letter, created_at=datetime.utcnow())
        session.add(app_obj)
        session.commit()
        session.refresh(app_obj)
        return app_obj


@app.get('/api/applications', response_model=list[ApplicationRead])
def list_applications(job_id: int | None = None, token: str = Depends(decode_access_token)):
    user_id = token
    user = get_user_by_id(user_id)
    with Session(engine) as session:
        statement = select(Application)
        results = session.exec(statement).all()
        if user.role == 'employer':
            if job_id:
                def filter_app(a: Application):
                    return a.job_id == job_id
                return [a for a in results if filter_app(a)]
        # regular users can see their own applications
        return [a for a in results if a.applicant_id == user.id]


@app.get('/api/employer/jobs', response_model=list[JobRead])
def employer_jobs(token: str = Depends(decode_access_token)):
    user_id = token
    user = get_user_by_id(user_id)
    if user.role != 'employer':
        raise HTTPException(status_code=403, detail='Not an employer')
    with Session(engine) as session:
        statement = select(Job).where(Job.posted_by == user.id)
        return session.exec(statement).all()


@app.post('/api/import-demo-accounts')
def import_demo_accounts(accounts: list[UserCreate], admin_secret: str | None = Header(default=None, alias='X-Admin-Secret')):
    # Very small admin guard using ADMIN_SECRET env variable
    expected = os.environ.get('ADMIN_SECRET', 'admin-secret')
    if admin_secret != expected:
        raise HTTPException(status_code=403, detail='Invalid admin secret')
    created = []
    with Session(engine) as session:
        for a in accounts:
            # skip existing
            statement = select(User).where(User.email == a.email, User.role == a.role)
            if session.exec(statement).first():
                continue
            user = User(name=a.name, email=a.email, role=a.role, hashed_password=get_password_hash(a.password))
            session.add(user)
            session.commit()
            session.refresh(user)
            created.append(user)
    return {"created": [UserRead.from_orm(u) for u in created]}


@app.post('/api/import-demo-jobs')
def import_demo_jobs(jobs: list[JobCreate], admin_secret: str | None = Header(default=None, alias='X-Admin-Secret')):
    expected = os.environ.get('ADMIN_SECRET', 'admin-secret')
    if admin_secret != expected:
        raise HTTPException(status_code=403, detail='Invalid admin secret')
    created = []
    with Session(engine) as session:
        for j in jobs:
            job = Job.from_orm(j)
            session.add(job)
            session.commit()
            session.refresh(job)
            created.append(job)
    return {"created": [JobRead.from_orm(j) for j in created]}
