from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts.views import PostViewSet, RegisterView, LoginView, LogoutView, UserMeView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),

    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', LoginView.as_view(), name='auth_login'),
    path('api/logout/', LogoutView.as_view(), name='auth_logout'),
    path('api/me/', UserMeView.as_view(), name='auth_me'),
]

"""
========================================================================
========================================================================
POST /api/register/: Crear cuenta.

POST /api/login/: Obtener token (necesitas username y password).

GET /api/posts/: Ver todos los posts.

POST /api/posts/: Crear un post (enviar content y, si es respuesta, el ID de parent).

POST /api/posts/{id}/like/: Dar/Quitar like.

GET /api/posts/{id}/replies/: Ver hilos de conversación.
========================================================================
========================================================================

"""