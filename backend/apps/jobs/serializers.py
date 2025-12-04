"""
Serializers for Job-related data.
Handles conversion between MongoDB documents and JSON.
"""
from rest_framework import serializers


class SalarySerializer(serializers.Serializer):
    """Serializer for Salary embedded document."""
    min_amount = serializers.FloatField(required=False, allow_null=True)
    max_amount = serializers.FloatField(required=False, allow_null=True)
    currency = serializers.CharField(default='USD')
    period = serializers.ChoiceField(
        choices=['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
        required=False
    )


class CompanySerializer(serializers.Serializer):
    """Serializer for Company embedded document."""
    name = serializers.CharField(max_length=255)
    logo = serializers.URLField(required=False, allow_null=True)
    website = serializers.URLField(required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_null=True)
    size = serializers.CharField(required=False, allow_null=True)
    industry = serializers.CharField(required=False, allow_null=True)


class LocationSerializer(serializers.Serializer):
    """Serializer for Location embedded document."""
    city = serializers.CharField(required=False, allow_null=True)
    state = serializers.CharField(required=False, allow_null=True)
    country = serializers.CharField(required=False, allow_null=True)
    postal_code = serializers.CharField(required=False, allow_null=True)
    is_remote = serializers.BooleanField(default=False)
    remote_type = serializers.ChoiceField(
        choices=['fully_remote', 'hybrid', 'on_site'],
        required=False
    )


class JobSerializer(serializers.Serializer):
    """Serializer for Job MongoDB document."""
    id = serializers.CharField(read_only=True, source='pk')
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    description_html = serializers.CharField(required=False, allow_null=True)
    
    company = CompanySerializer()
    location = LocationSerializer(required=False)
    
    job_type = serializers.ChoiceField(
        choices=['full_time', 'part_time', 'contract', 'temporary', 'internship', 'freelance'],
        required=False
    )
    experience_level = serializers.ChoiceField(
        choices=['entry', 'mid', 'senior', 'lead', 'executive'],
        required=False
    )
    
    salary = SalarySerializer(required=False)
    benefits = serializers.ListField(child=serializers.CharField(), required=False)
    
    skills = serializers.ListField(child=serializers.CharField(), required=False)
    requirements = serializers.ListField(child=serializers.CharField(), required=False)
    qualifications = serializers.ListField(child=serializers.CharField(), required=False)
    
    category = serializers.CharField(required=False, allow_null=True)
    industry = serializers.CharField(required=False, allow_null=True)
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    
    source = serializers.CharField()
    source_url = serializers.URLField(required=False, allow_null=True)
    apply_url = serializers.URLField(required=False, allow_null=True)
    
    is_active = serializers.BooleanField(default=True)
    is_featured = serializers.BooleanField(default=False)
    views_count = serializers.IntegerField(read_only=True)
    applications_count = serializers.IntegerField(read_only=True)
    
    posted_at = serializers.DateTimeField(required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class JobListSerializer(serializers.Serializer):
    """Lightweight serializer for job listings."""
    id = serializers.CharField(read_only=True, source='pk')
    title = serializers.CharField()
    company = CompanySerializer()
    location = LocationSerializer()
    job_type = serializers.CharField()
    salary = SalarySerializer()
    is_remote = serializers.SerializerMethodField()
    posted_at = serializers.DateTimeField()
    is_featured = serializers.BooleanField()
    
    def get_is_remote(self, obj):
        if obj.location:
            return obj.location.is_remote
        return False


class JobApplicationSerializer(serializers.Serializer):
    """Serializer for job applications."""
    id = serializers.CharField(read_only=True, source='pk')
    user_id = serializers.IntegerField(read_only=True)
    job_id = serializers.CharField()
    status = serializers.ChoiceField(
        choices=['pending', 'reviewed', 'interviewing', 'offered', 'rejected', 'withdrawn'],
        default='pending'
    )
    cover_letter = serializers.CharField(required=False, allow_null=True)
    resume_url = serializers.URLField(required=False, allow_null=True)
    applied_at = serializers.DateTimeField(read_only=True)
    notes = serializers.CharField(required=False, allow_null=True)


class SavedJobSerializer(serializers.Serializer):
    """Serializer for saved jobs."""
    id = serializers.CharField(read_only=True, source='pk')
    user_id = serializers.IntegerField(read_only=True)
    job_id = serializers.CharField()
    saved_at = serializers.DateTimeField(read_only=True)
    notes = serializers.CharField(required=False, allow_null=True)
