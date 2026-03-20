from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "message", "parent", "date", "likes")
    search_fields = ("username", "message")
    list_filter = ("date", "parent")
    readonly_fields = ("date",)
