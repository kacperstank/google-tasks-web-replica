"""
Makes the defined endpoints accessible.
"""

from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin interface
    path('', include('tasks.urls')),  # Include app-specific URLs
]
