from django.urls import path, include
from graphene_django.views import GraphQLView
from .schema import schema
urlpatterns = [
    # ... other paths
    path('graphql/', GraphQLView.as_view(graphiql=True,schema=schema)),
]