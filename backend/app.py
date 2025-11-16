from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlmodel import SQLModel, Session, select
from sqlmodel import create_engine
import os
from datetime import timedelta

from models import User
from auth import get_password_hash, verify_password, create_access_token, decode_access_token
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/site", StaticFiles(directory="../"), name="site")
app.mount("/", StaticFiles(directory="../"), name="root")

# Database
DB_PATH = os.path.join(os.path.dirname(__file__), "app.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
async def read_root():
    return {"message": "APPLY N HIRE API"}


@app.post('/auth/register')
def register(payload: dict):
    email = payload.get('email', '').lower()
    first_name = payload.get('first_name')
    last_name = payload.get('last_name')
    password = payload.get('password')
    role = payload.get('role', 'applicant')
    if not email or not password or not first_name or not last_name:
        raise HTTPException(status_code=400, detail='Missing fields')

    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == email)).first()
        if existing:
            raise HTTPException(status_code=400, detail='Email already exists')
        user = User(first_name=first_name, last_name=last_name, email=email, password_hash=get_password_hash(password), role=role)
        session.add(user)
        session.commit()
        session.refresh(user)

        token = create_access_token({"sub": user.email}, os.environ.get('JWT_SECRET', 'devsecret'), expires_delta=timedelta(hours=4))
        return JSONResponse({"access_token": token, "token_type": "bearer"})


@app.post('/auth/login')
def login(form: OAuth2PasswordRequestForm = Depends()):
    email = form.username.lower()
    password = form.password
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect username or password')
        token = create_access_token({"sub": user.email}, os.environ.get('JWT_SECRET', 'devsecret'), expires_delta=timedelta(hours=4))
        return {"access_token": token, "token_type": "bearer"}


@app.get('/auth/me')
def me(request: Request):
    auth = request.headers.get('Authorization')
    if not auth:
        raise HTTPException(status_code=401, detail='Not authenticated')
    parts = auth.split()
    if len(parts) != 2:
        raise HTTPException(status_code=401, detail='Not authenticated')
    token = parts[1]
    payload = decode_access_token(token, os.environ.get('JWT_SECRET', 'devsecret'))
    if not payload:
        raise HTTPException(status_code=401, detail='Token invalid')
    email = payload.get('sub')
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        if not user:
            raise HTTPException(status_code=401, detail='User not found')
        return {"id": user.id, "first_name": user.first_name, "last_name": user.last_name, "email": user.email, "role": user.role}


@app.get('/admin/protected')
def admin_protected(request: Request):
    # Validate token and role
    auth = request.headers.get('Authorization')
    if not auth:
        raise HTTPException(status_code=401, detail='Not authenticated')
    token = auth.split()[1]
    payload = decode_access_token(token, os.environ.get('JWT_SECRET', 'devsecret'))
    if not payload:
        raise HTTPException(status_code=401, detail='Invalid token')
    email = payload.get('sub')
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        if not user or user.role != 'employer':
            raise HTTPException(status_code=403, detail='Forbidden')
        return {"detail": "Welcome Employer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)