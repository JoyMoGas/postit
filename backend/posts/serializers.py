from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(
        source='user.username'
    )

    user_id = serializers.ReadOnlyField(
        source='user.id'
    )

    likes_count = serializers.SerializerMethodField()

    replies_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_id', 'content', 'parent', 'likes_count', 'replies_count', 'created_at']

        def get_likes_count(self, obj):
            return obj.likes.likes.count()

        def get_replies_count(self, obj):
            return obj.replies.count()
