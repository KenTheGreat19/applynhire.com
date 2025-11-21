from typing import Optional, List
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, JSON, ForeignKey
from pydantic import BaseModel, EmailStr
from datetime import datetime


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: EmailStr
    role: str
    hashed_password: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str


class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    company: str
    location: str
    type: str
    category: str
    salary: Optional[str] = None
    posted: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = Field(default_factory=list, sa_column=Column(JSON))
    responsibilities: Optional[List[str]] = Field(default_factory=list, sa_column=Column(JSON))
    tags: Optional[List[str]] = Field(default_factory=list, sa_column=Column(JSON))
    posted_by: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: Optional[datetime] = None


class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    type: str
    category: str
    salary: Optional[str] = None
    posted: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = []
    responsibilities: Optional[List[str]] = []
    tags: Optional[List[str]] = []


class JobRead(BaseModel):
    id: int
    title: str
    company: str
    location: str
    type: str
    category: str
    salary: Optional[str]
    posted: Optional[str]
    description: Optional[str]
    requirements: Optional[List[str]]
    responsibilities: Optional[List[str]]
    tags: Optional[List[str]]
    posted_by: Optional[int]
    created_at: Optional[datetime]


class Application(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    job_id: int = Field(foreign_key="job.id")
    applicant_id: Optional[int] = Field(default=None, foreign_key="user.id")
    name: str
    email: EmailStr
    cover_letter: Optional[str] = None
    created_at: Optional[datetime] = None


class ApplicationCreate(BaseModel):
    job_id: int
    name: str
    email: EmailStr
    cover_letter: Optional[str] = None


class ApplicationRead(BaseModel):
    id: int
    job_id: int
    applicant_id: Optional[int]
    name: str
    email: EmailStr
    cover_letter: Optional[str]
    created_at: Optional[datetime]
