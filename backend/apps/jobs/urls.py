"""
URL routes for jobs API.
"""
from django.urls import path
from .views import (
    JobListView,
    JobDetailView,
    FeaturedJobsView,
    ApplyToJobView,
    UserApplicationsView,
    SaveJobView,
    UserSavedJobsView,
    JobCategoriesView
)

urlpatterns = [
    path('', JobListView.as_view(), name='job-list'),
    path('featured/', FeaturedJobsView.as_view(), name='featured-jobs'),
    path('categories/', JobCategoriesView.as_view(), name='job-categories'),
    path('<str:job_id>/', JobDetailView.as_view(), name='job-detail'),
    path('<str:job_id>/apply/', ApplyToJobView.as_view(), name='apply-to-job'),
    path('<str:job_id>/save/', SaveJobView.as_view(), name='save-job'),
    path('user/applications/', UserApplicationsView.as_view(), name='user-applications'),
    path('user/saved/', UserSavedJobsView.as_view(), name='user-saved-jobs'),
]
