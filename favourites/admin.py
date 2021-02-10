from django.contrib import admin
from .models import Favourite

# Register your models here.
class FavouriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'media_title')
    list_display_links = ('id', 'username')
    search_fields = ('username', 'media_title')
    list_per_page = 25

admin.site.register(Favourite, FavouriteAdmin)