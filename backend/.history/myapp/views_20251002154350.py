from graphene_django.views import GraphQLView
from django.http import HttpResponse

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        # print(request.header)
        print("Authorization Header:", request.headers.get("Authorization"))
        print(f"User: {info.context.user}, Auth header: {info.context.META.get('HTTP_AUTHORIZATION')}")

        self.response = HttpResponse()
        request.response = self.response
        return super().dispatch(request, *args, **kwargs)


    def finalize_response(self, request, response, *args, **kwargs):
        return getattr(request, 'response', response)
    


