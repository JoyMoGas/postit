from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "content", "parent", "created_at")
    search_fields = ("user__username", "content")
    list_filter = ("created_at", "parent")
    readonly_fields = ("created_at",)
