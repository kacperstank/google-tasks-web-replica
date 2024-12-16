from django.urls import path
from .views import TaskListCreateView, TaskDetailView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),  # List/create tasks
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),  # Retrieve/update/delete a task by ID
]