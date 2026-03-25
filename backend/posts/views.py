from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Post
from .serializers import PostSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access')
            response.set_cookie(
                key=settings.SIMPLE_JWT.get('AUTH_COOKIE', 'access_token'),
                value=access_token,
                httponly=settings.SIMPLE_JWT.get('AUTH_COOKIE_HTTP_ONLY', True),
                samesite=settings.SIMPLE_JWT.get('AUTH_COOKIE_SAMESITE', 'Lax'),
                secure=settings.SIMPLE_JWT.get('AUTH_COOKIE_SECURE', False),
                path=settings.SIMPLE_JWT.get('AUTH_COOKIE_PATH', '/'),
            )
    
            del response.data['access']
            if 'refresh' in response.data:
                del response.data['refresh']
        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Sesión cerrada"}, status=status.HTTP_200_OK)
        response.delete_cookie(
            settings.SIMPLE_JWT.get('AUTH_COOKIE', 'access_token'),
            path=settings.SIMPLE_JWT.get('AUTH_COOKIE_PATH', '/'),
            samesite=settings.SIMPLE_JWT.get('AUTH_COOKIE_SAMESITE', 'Lax')
        )
        return response

class UserMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('user').prefetch_related('likes', 'replies')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return Response({'status': 'unliked', 'count': post.likes.count()})
        else:
            post.likes.add(request.user)
            return Response({'status': 'liked', 'count': post.likes.count()})

    @action(detail=True, methods=['get'])
    def replies(self, request, pk=None):
        post = self.get_object()
        replies = post.replies.all()
        serializer = self.get_serializer(replies, many=True)
        return Response(serializer.data)