# views.py
from graphene_django.views import GraphQLView
from django.http import HttpResponse

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        self.response = HttpResponse()
        request.response = self.response
        return super().dispatch(request, *args, **kwargs)

    def execute_graphql_request(self, *args, **kwargs):
        result = super().execute_graphql_request(*args, **kwargs)
        # Attach the HttpResponse to the context so mutations can use it
        if result:
            context = result.context
            if hasattr(context, 'response') is False:
                context.response = self.response
        return result

    def finalize_response(self, request, response, *args, **kwargs):
        # Return the custom response with cookies set
        return getattr(request, 'response', response)
