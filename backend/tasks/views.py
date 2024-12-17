"""
Defines API views for Task model CRUD operations.
"""

from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    # Handles listing all tasks (GET) and creating a new task (POST)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    # Handles retrieving (GET), updating (PUT), and deleting (DELETE) a specific task
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
