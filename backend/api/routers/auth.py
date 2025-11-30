"""
Authentication router
"""
from fastapi import APIRouter, Depends
from sqlmodel import Session
from ...models import UserCreate, UserRead, UserLogin
from ...db import get_session
from ...services import UserService, create_access_token, decode_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=UserRead)
def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    """Register a new user"""
    return UserService.create_user(session, user_in)


@router.post("/signin")
def signin(credentials: UserLogin, session: Session = Depends(get_session)):
    """Sign in a user"""
    user = UserService.authenticate_user(session, credentials.email, credentials.password)
    token = create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserRead.from_orm(user)
    }


@router.get("/profile", response_model=UserRead)
def get_profile(user_id: str = Depends(decode_access_token), session: Session = Depends(get_session)):
    """Get current user profile"""
    return UserService.get_user_by_id(session, int(user_id))
