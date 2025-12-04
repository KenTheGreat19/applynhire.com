"""
MongoDB Models for Job data using MongoEngine.
Jobs are stored in MongoDB for flexible schema and fast reads.
"""
from mongoengine import (
    Document, 
    EmbeddedDocument,
    StringField, 
    IntField, 
    FloatField,
    ListField,
    DictField,
    DateTimeField,
    BooleanField,
    EmbeddedDocumentField,
    URLField
)
from datetime import datetime


class Salary(EmbeddedDocument):
    """Embedded document for salary information."""
    min_amount = FloatField()
    max_amount = FloatField()
    currency = StringField(default='USD')
    period = StringField(choices=['hourly', 'daily', 'weekly', 'monthly', 'yearly'])


class Company(EmbeddedDocument):
    """Embedded document for company information."""
    name = StringField(required=True)
    logo = URLField()
    website = URLField()
    description = StringField()
    size = StringField()
    industry = StringField()


class Location(EmbeddedDocument):
    """Embedded document for job location."""
    city = StringField()
    state = StringField()
    country = StringField()
    postal_code = StringField()
    is_remote = BooleanField(default=False)
    remote_type = StringField(choices=['fully_remote', 'hybrid', 'on_site'])


class Job(Document):
    """
    MongoDB document for job listings.
    Schema is flexible to accommodate different sources.
    """
    # Core fields
    title = StringField(required=True, max_length=255)
    description = StringField(required=True)
    description_html = StringField()  # Preserve HTML formatting
    
    # Company info (embedded for denormalization)
    company = EmbeddedDocumentField(Company, required=True)
    
    # Location
    location = EmbeddedDocumentField(Location)
    
    # Job details
    job_type = StringField(choices=[
        'full_time', 'part_time', 'contract', 
        'temporary', 'internship', 'freelance'
    ])
    experience_level = StringField(choices=[
        'entry', 'mid', 'senior', 'lead', 'executive'
    ])
    
    # Compensation
    salary = EmbeddedDocumentField(Salary)
    benefits = ListField(StringField())
    
    # Requirements
    skills = ListField(StringField())
    requirements = ListField(StringField())
    qualifications = ListField(StringField())
    
    # Categorization
    category = StringField()
    industry = StringField()
    tags = ListField(StringField())
    
    # Source tracking (for scraped jobs)
    source = StringField(required=True)  # e.g., 'linkedin', 'indeed', 'direct'
    source_url = URLField()
    source_job_id = StringField()  # Original ID from source
    
    # Application info
    apply_url = URLField()
    apply_email = StringField()
    application_deadline = DateTimeField()
    
    # Metadata
    is_active = BooleanField(default=True)
    is_featured = BooleanField(default=False)
    views_count = IntField(default=0)
    applications_count = IntField(default=0)
    
    # Timestamps
    posted_at = DateTimeField()
    scraped_at = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    expires_at = DateTimeField()
    
    # Raw data storage (for debugging/reprocessing)
    raw_data = DictField()
    
    meta = {
        'collection': 'jobs',
        'indexes': [
            'title',
            'company.name',
            'location.city',
            'location.country',
            'job_type',
            'experience_level',
            'skills',
            'source',
            'is_active',
            'posted_at',
            {'fields': ['$title', '$description', '$skills'],
             'default_language': 'english',
             'weights': {'title': 10, 'skills': 5, 'description': 1}}
        ],
        'ordering': ['-posted_at']
    }
    
    def __str__(self):
        return f"{self.title} at {self.company.name}"
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)


class SavedJob(Document):
    """Track jobs saved by users."""
    user_id = IntField(required=True)  # References PostgreSQL User.id
    job_id = StringField(required=True)  # References Job._id
    saved_at = DateTimeField(default=datetime.utcnow)
    notes = StringField()
    
    meta = {
        'collection': 'saved_jobs',
        'indexes': [
            'user_id',
            ('user_id', 'job_id')
        ]
    }


class JobApplication(Document):
    """Track job applications."""
    user_id = IntField(required=True)  # References PostgreSQL User.id
    job_id = StringField(required=True)  # References Job._id
    status = StringField(
        choices=['pending', 'reviewed', 'interviewing', 'offered', 'rejected', 'withdrawn'],
        default='pending'
    )
    cover_letter = StringField()
    resume_url = URLField()
    applied_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    notes = StringField()
    
    meta = {
        'collection': 'job_applications',
        'indexes': [
            'user_id',
            'job_id',
            'status',
            ('user_id', 'job_id')
        ]
    }
