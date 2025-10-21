# urls.py
from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt
import graphql_jwt

urlpatterns = [
path(
  "graphql/",
  csrf_exempt(
    CustomGraphQLView.as_view(
      graphiql=True,
      schema=schema,
      middleware=[graphql_jwt.middleware.JSONWebTokenMiddleware()],
    )
  ),
),

]
