"""
URL configuration for ApplyNHire project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.api.urls')),
    path('api/auth/', include('apps.users.urls')),
]
