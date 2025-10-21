from django.urls import path
from myapp.views import graphql

urlpatterns = [
    path('graphql/', graphql),
]