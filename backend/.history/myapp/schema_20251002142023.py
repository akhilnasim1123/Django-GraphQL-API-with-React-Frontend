import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from graphql_jwt.shortcuts import get_token, create_refresh_token
from .models import Departments
from django.core.files.base import ContentFile
import base64
from .models import CustomUser

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "bio")


class DepartmentType(DjangoObjectType):
    class Meta:
        model = Departments
        fields = "__all__"


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    refresh_token = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)


    def mutate(self, info, username, email, password):
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        token = get_token(user)
        refresh_token = create_refresh_token(user)

        return CreateUser(user=user, token=token, refresh_token=refresh_token)


class CreateDepartment(graphene.Mutation):
    department = graphene.Field(DepartmentType)

    class Arguments:
        name = graphene.String(required=True)
        image = graphene.String(required=True)
        lead = graphene.String(required=True)
        user = graphene.String(required=True)

    def mutate(self, info, name, image, lead,user):
          
        print("User:", user)
        print("Name:", name)
        print("Lead:", lead)
        print("Image preview:", image[:50])  
        user = CustomUser.objects.get(username=user)
        if user.is_anonymous:
            raise Exception("Authentication required")

        if image.startswith("data:image"):
            format, imgstr = image.split(';base64,')
            ext = format.split('/')[-1]
            image_file = ContentFile(base64.b64decode(imgstr), name=f"{name}.{ext}")
        else:
            raise Exception("Invalid image format")
        department = Departments.objects.create(
            user=user,
            name=name,
            image=image_file,
            lead=lead
        )
        return CreateDepartment(department=department)
 


class ObtainJSONWebTokenWithCookies(graphql_jwt.ObtainJSONWebToken):
    @classmethod
    def resolve(cls, root, info, **kwargs):
        result = super().resolve(root, info, **kwargs)

        response = info.context

        if hasattr(response, "set_cookie") and result.token:
            response.set_cookie(
                "access_token",
                result.token,
                httponly=True,
                secure=False,  
                samesite="Lax",
                max_age=3600, 
                path="/",
            )

            refresh_token = create_refresh_token(info.context.user)
            response.set_cookie(
                "refresh_token",
                refresh_token,
                httponly=True,
                secure=False,  
                samesite="Lax",
                max_age=7 * 24 * 3600,
                path="/",
            )

        return result



class Query(graphene.ObjectType):
    whoami = graphene.Field(UserType)
    users = graphene.List(UserType)
    departments = graphene.List(DepartmentType)

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication failure: You must be signed in.")
        return user

    @login_required
    def resolve_users(self, info):
        return User.objects.all()
    
    @login_required
    def resolve_departments(self, info):
        return User.objects.all()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field() 
    createDepartment = CreateDepartment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
