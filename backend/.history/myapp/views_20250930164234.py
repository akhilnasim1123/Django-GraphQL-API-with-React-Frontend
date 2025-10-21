from graphene_django.views import GraphQLView
from django.http import HttpResponse

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        self.response = HttpResponse()
        request.response = self.response 
        return super().dispatch(request, *args, **kwargs)


    def finalize_response(self, request, response, *args, **kwargs):
        return getattr(request, 'response', response)
        
