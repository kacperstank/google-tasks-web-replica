from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)  # Required
    details = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Set on creation
    updated_at = models.DateTimeField(auto_now=True)  # Updated on save
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)  # Optional due date
    location = models.CharField(max_length=255, blank=True)  # Optional location
    meeting_url = models.URLField(blank=True)  # Optional meeting URL

    def __str__(self):
        return self.title