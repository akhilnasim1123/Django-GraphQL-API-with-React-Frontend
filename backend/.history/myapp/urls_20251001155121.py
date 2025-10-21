from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.middleware import JSONWebTokenMiddleware

urlpatterns = [
    path(
        "graphql/",
        csrf_exempt(
            GraphQLView.as_view(
                graphiql=True,
                schema=schema,
                middleware=[JSONWebTokenMiddleware()],
            )
        ),
    ),
]
