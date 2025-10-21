from graphene_django.views import GraphQLView
from django.http import HttpResponse

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        self.response = HttpResponse()
        request.response = self.response  # attach response to request (context)
        return super().dispatch(request, *args, **kwargs)


    def finalize_response(self, request, response, *args, **kwargs):
        # return the custom response you attached to request, or fallback to default response
        return getattr(request, 'response', response)
