"""
Views for Job listings and applications.
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from bson import ObjectId

from .models import Job, JobApplication, SavedJob, Company, Location, Salary
from .serializers import (
    JobSerializer, 
    JobListSerializer, 
    JobApplicationSerializer,
    SavedJobSerializer
)


class JobListView(APIView):
    """List and search jobs."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Get query parameters
        search = request.query_params.get('search', '')
        job_type = request.query_params.get('job_type', '')
        location = request.query_params.get('location', '')
        remote = request.query_params.get('remote', '')
        experience = request.query_params.get('experience', '')
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 20))
        
        # Build query
        query = {'is_active': True}
        
        if search:
            query['$text'] = {'$search': search}
        
        if job_type:
            query['job_type'] = job_type
        
        if location:
            query['$or'] = [
                {'location__city__icontains': location},
                {'location__state__icontains': location},
                {'location__country__icontains': location}
            ]
        
        if remote and remote.lower() == 'true':
            query['location__is_remote'] = True
        
        if experience:
            query['experience_level'] = experience
        
        # Execute query with pagination
        skip = (page - 1) * page_size
        jobs = Job.objects(**query).skip(skip).limit(page_size)
        total = Job.objects(**query).count()
        
        serializer = JobListSerializer(jobs, many=True)
        
        return Response({
            'results': serializer.data,
            'count': total,
            'page': page,
            'page_size': page_size,
            'total_pages': (total + page_size - 1) // page_size
        })


class JobDetailView(APIView):
    """Get single job details."""
    permission_classes = [AllowAny]
    
    def get(self, request, job_id):
        try:
            job = Job.objects.get(pk=ObjectId(job_id))
            job.views_count += 1
            job.save()
            
            serializer = JobSerializer(job)
            return Response(serializer.data)
        except Job.DoesNotExist:
            return Response(
                {'error': 'Job not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class FeaturedJobsView(APIView):
    """Get featured job listings."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        limit = int(request.query_params.get('limit', 10))
        jobs = Job.objects(is_active=True, is_featured=True).limit(limit)
        serializer = JobListSerializer(jobs, many=True)
        return Response(serializer.data)


class ApplyToJobView(APIView):
    """Apply to a job."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, job_id):
        # Check if job exists
        try:
            job = Job.objects.get(pk=ObjectId(job_id))
        except Job.DoesNotExist:
            return Response(
                {'error': 'Job not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if already applied
        existing = JobApplication.objects(
            user_id=request.user.id,
            job_id=job_id
        ).first()
        
        if existing:
            return Response(
                {'error': 'You have already applied to this job'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create application
        application = JobApplication(
            user_id=request.user.id,
            job_id=job_id,
            cover_letter=request.data.get('cover_letter'),
            resume_url=request.data.get('resume_url')
        )
        application.save()
        
        # Update job application count
        job.applications_count += 1
        job.save()
        
        serializer = JobApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserApplicationsView(APIView):
    """List user's job applications."""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        applications = JobApplication.objects(user_id=request.user.id)
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)


class SaveJobView(APIView):
    """Save/unsave a job."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, job_id):
        # Check if job exists
        try:
            Job.objects.get(pk=ObjectId(job_id))
        except Job.DoesNotExist:
            return Response(
                {'error': 'Job not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Toggle save status
        existing = SavedJob.objects(
            user_id=request.user.id,
            job_id=job_id
        ).first()
        
        if existing:
            existing.delete()
            return Response({'message': 'Job removed from saved'})
        
        saved = SavedJob(
            user_id=request.user.id,
            job_id=job_id,
            notes=request.data.get('notes')
        )
        saved.save()
        
        serializer = SavedJobSerializer(saved)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserSavedJobsView(APIView):
    """List user's saved jobs."""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        saved_jobs = SavedJob.objects(user_id=request.user.id)
        serializer = SavedJobSerializer(saved_jobs, many=True)
        return Response(serializer.data)


class JobCategoriesView(APIView):
    """Get all job categories with counts."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        pipeline = [
            {'$match': {'is_active': True}},
            {'$group': {'_id': '$category', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}}
        ]
        results = Job.objects.aggregate(pipeline)
        categories = [{'name': r['_id'], 'count': r['count']} for r in results if r['_id']]
        return Response(categories)
