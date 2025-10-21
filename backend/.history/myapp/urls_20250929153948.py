from django.urls import path
from graphene_django.views import GraphQLView
from .sch import schema # Import your schema

urlpatterns = [
    path("graphql/", GraphQLView.as_view(schema=schema, graphiql=True)),
]