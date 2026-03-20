from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from post.views import PostViewSet, RegisterView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),

    path("api/register/", RegisterView.as_view(), name='register'),
    path("api/login/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
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