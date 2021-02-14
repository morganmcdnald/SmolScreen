from django.contrib import admin
from .models import List

# Register your models here.
class ListAdmin(admin.ModelAdmin):
    list_display = ('id', 'list_name', 'owner_username')
    list_display_links = ('id', 'list_name', 'owner_username')
    search_fields = ('id', 'list_name', 'owner_username')
    list_per_page = 25

admin.site.register(List, ListAdmin)