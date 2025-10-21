from django.urls import path
from .views import graphql

urlpatterns = [
    path('graphql/', graphql),
] 