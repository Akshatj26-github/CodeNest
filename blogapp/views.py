from django.utils import timezone
from django.shortcuts import render
from .models import Blog,Category
from django.contrib.auth import get_user_model
from .serializers import SimpleAuthorSerializer, UpdateUserProfileSerializer, UserInfoSerializer, UserRegistrationSerializer, BlogSerializer,CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import render, get_object_or_404
from django.db.models import Q

@api_view(["POST"])
def register_user(request):
    user = UserRegistrationSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UpdateUserProfileSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogListPagination(PageNumberPagination):
    page_size = 6  # A number to control items per page

@api_view(["GET"])
def blog_list(request):
    blogs = Blog.objects.all()
    paginator = BlogListPagination()
    paginated_blogs = paginator.paginate_queryset(blogs, request)
    serializer = BlogSerializer(paginated_blogs, many=True, context={"request": request}) 
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
def get_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog)
    return Response(serializer.data)


#Lets now start CRUD(Create Read Update Delete) operations....

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    user = request.user 
    data = request.data.copy()

    # Set published_date if not a draft
    if data.get("is_draft") in [False, "false", "False", 0, "0"]:
        data["published_date"] = timezone.now()

    serializer = BlogSerializer(data=data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    user = request.user  
    try:
        blog = Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if blog.author != user:
        return Response(
            {"error": "You are not the author of this blog"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = BlogSerializer(blog, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    blog = Blog.objects.get(id=pk)
    user = request.user 
    if blog.author != user:
        return Response({"error": "You are not the author of this blog"}, status=status.HTTP_403_FORBIDDEN)
    blog.delete()
    return Response({"message": "Blog deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    username = user.username
    return Response({"username": username})

@api_view(['GET'])
def get_userinfo(request, username):
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
        serializer = UserInfoSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def get_user(request, email):
    User = get_user_model()
    try:
        existing_user = User.objects.get(email=email)
        serializer = SimpleAuthorSerializer(existing_user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET", "POST"])
def category_view(request):
    if request.method == "GET":
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        category = request.data.get("category", "").strip()
        if not category:
            return Response({"error": "category is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if it already exists
        existing = Category.objects.filter(jobTitle__iexact=category).first()
        if existing:
            serializer = CategorySerializer(existing)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Create new job title
        serializer = CategorySerializer(data={"jobTitle": category})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    user = request.user

    if user in blog.likes.all():
        blog.likes.remove(user)
        liked = False
    else:
        blog.likes.add(user)
        liked = True

    return Response({
        'liked': liked,
        'total_likes': blog.total_likes()
    })

@api_view(["GET"])
def search_blogs(request):
        query = request.GET.get("query", "").strip()
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        blogs = Blog.objects.filter(
            Q(title__icontains=query) |
            Q(category__name__icontains=query) |
            Q(author__first_name__icontains=query) |
            Q(author__last_name__icontains=query) 
        ).distinct()

        serializer = BlogSerializer(blogs, many=True, context={"request": request})
        return Response(serializer.data, status=200)