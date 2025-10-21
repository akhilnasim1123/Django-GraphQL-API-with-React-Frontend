import graphene
from graphene_django.types import DjangoObjectType
from .models import User, Department

class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department

class UserType(DjangoObjectType):
    class Meta:
        model = User

    # Include the ForeignKey relationship


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    department = graphene.Field(DepartmentType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

schema = graphene.Schema(query=Query)