from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task  # Links the serializer to the Task model
        fields = '__all__'  # Includes all model fields in the API