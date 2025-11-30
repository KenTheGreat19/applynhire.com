"""
User service for business logic
"""
from sqlmodel import Session, select
from fastapi import HTTPException
from ..models import User, UserCreate
from .auth_service import get_password_hash, verify_password


class UserService:
    """User business logic"""
    
    @staticmethod
    def create_user(session: Session, user_in: UserCreate) -> User:
        """Create a new user"""
        # Check if user exists
        statement = select(User).where(User.email == user_in.email)
        existing = session.exec(statement).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create user
        user = User.from_orm(user_in)
        user.hashed_password = get_password_hash(user_in.password)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    
    @staticmethod
    def authenticate_user(session: Session, email: str, password: str) -> User:
        """Authenticate a user"""
        statement = select(User).where(User.email == email)
        user = session.exec(statement).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        return user
    
    @staticmethod
    def get_user_by_id(session: Session, user_id: int) -> User:
        """Get user by ID"""
        statement = select(User).where(User.id == user_id)
        user = session.exec(statement).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
