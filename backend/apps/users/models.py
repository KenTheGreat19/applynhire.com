"""
Custom User Model for ApplyNHire
Supports both Employers and Applicants with role-based access.
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model with role support."""
    
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        EMPLOYER = 'employer', 'Employer'
        APPLICANT = 'applicant', 'Applicant'
    
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.APPLICANT
    )
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.email} ({self.role})"
    
    @property
    def is_employer(self):
        return self.role == self.Role.EMPLOYER
    
    @property
    def is_applicant(self):
        return self.role == self.Role.APPLICANT


class EmployerProfile(models.Model):
    """Extended profile for employer users."""
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='employer_profile'
    )
    company_name = models.CharField(max_length=255)
    company_website = models.URLField(blank=True, null=True)
    company_description = models.TextField(blank=True, null=True)
    company_logo = models.URLField(blank=True, null=True)
    company_size = models.CharField(max_length=50, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'employer_profiles'
    
    def __str__(self):
        return self.company_name


class ApplicantProfile(models.Model):
    """Extended profile for applicant users."""
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='applicant_profile'
    )
    headline = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    resume_url = models.URLField(blank=True, null=True)
    skills = models.JSONField(default=list, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    education = models.JSONField(default=list, blank=True)
    work_history = models.JSONField(default=list, blank=True)
    preferred_locations = models.JSONField(default=list, blank=True)
    preferred_job_types = models.JSONField(default=list, blank=True)
    salary_expectation_min = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=True
    )
    salary_expectation_max = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=True
    )
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'applicant_profiles'
    
    def __str__(self):
        return f"{self.user.email} - Profile"
