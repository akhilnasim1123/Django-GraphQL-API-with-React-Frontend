import graphene
from graphene_django.types import DjangoObjectType
from .models import User

class UserType(DjangoObjectType):  # Use DjangoObjectType for better integration with Django models
    class Meta:
        model = User

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)


    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()
schema = graphene.Schema(query=Query)