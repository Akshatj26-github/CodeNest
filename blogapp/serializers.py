from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog,Category

User = get_user_model()

class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "email", "username", "first_name", "last_name", "bio", "job_title",
            "profile_picture", "facebook", "youtube", "instagram", "twitter"
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "password"]
        
        # add extra settings to individual fields — without having to redefine the field entirely.
        extra_kwargs = {
            'password': {'write_only': True}
        }
        # ensures the password can be used in input but is never exposed in output.

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"]
        )
        user.set_password(validated_data["password"]) 
        # set_password() handles hashing using Django’s secure algorithm.
        user.save()
        return user


class SimpleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "profile_picture"]


class BlogSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)
    category = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Category.objects.all()
    )
    total_likes = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'author', 'category', 'content',
            'featured_image', 'published_date', 'created', 'updated', 'is_draft',
            'total_likes', 'is_liked'
        ]

    def get_total_likes(self, obj):
        return obj.total_likes()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return request.user in obj.likes.all()
        return False

    def create(self, validated_data):
        if not validated_data.get("is_draft"):
            validated_data["published_date"] = timezone.now()
        return super().create(validated_data)


class UserInfoSerializer(serializers.ModelSerializer):
    author_posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "first_name", "last_name", "job_title",
            "bio", "profile_picture", "author_posts","facebook", "youtube", "instagram", "twitter"
        ]

    def get_author_posts(self, user):
        blogs = Blog.objects.filter(author=user)[:9]
        return BlogSerializer(blogs, many=True).data
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

