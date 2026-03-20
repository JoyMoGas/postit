from django.urls import path
from .views import CommentListCreateView, CommentDestroyView, LikeCommentView

urlpatterns = [
    path("", CommentListCreateView.as_view(), name="comment-list-create"),
    path("<int:id>/", CommentDestroyView.as_view(), name="comment-delete"),
    path("<int:id>/like/", LikeCommentView.as_view(), name="comment-like"),
]
