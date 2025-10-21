from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView 

@csrf_exempt
def graphql(request, *args, **kwargs):
    return GraphQLView.as_view(graphiql=True)(request, *args, **kwargs)