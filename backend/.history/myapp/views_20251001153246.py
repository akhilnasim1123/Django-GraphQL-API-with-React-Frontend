from graphene_django.views import GraphQLView
from django.http import HttpResponse

class CustomGraphQLView(from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt
from .views import CustomGraphQLView
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
):
    def dispatch(self, request, *args, **kwargs):
        self.response = HttpResponse()
        request.response = self.response 
        return super().dispatch(request, *args, **kwargs)


    def finalize_response(self, request, response, *args, **kwargs):
        return getattr(request, 'response', response)
    


