from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt  
from .views import CustomGraphQLView

urlpatterns = [
    path("graphql/", csrf_exempt(CustomGraphQLView.as_view(graphiql=True, schema=schema))),
]