"""
Main API URL configuration.
"""
from django.urls import path, include

urlpatterns = [
    path('jobs/', include('apps.jobs.urls')),
]
