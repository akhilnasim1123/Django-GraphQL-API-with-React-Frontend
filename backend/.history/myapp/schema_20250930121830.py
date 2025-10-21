import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token, create_refresh_token


User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "bio")

class CreateUser(graphene.Mutation):
    all_user = graphene.Field(UserType)
    token = graphene.String()
    refresh_token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
    all_user = graphene.Field(UserType)


    def mutate(self, info, username, email, password):
        
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        token = get_token(user)
        refresh_token = create_refresh_token(user)

        return CreateUser(user=seall_user, token=token, refresh_token=refresh_token)

class Query(graphene.ObjectType):
    whoami = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication failure: You must be signed in.")
        return user

    @login_required
    def resolve_users(self, info):
        return User.objects.all()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
