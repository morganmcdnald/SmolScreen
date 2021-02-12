from django.contrib import admin
from .models import Follow

# Register your models here.
class FollowAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'following_username')
    list_display_links = ('id', 'username')
    search_fields = ('username', 'following_username')
    list_per_page = 25

admin.site.register(Follow, FollowAdmin)