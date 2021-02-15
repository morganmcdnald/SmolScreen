from django.contrib import admin
from .models import Actor

# Register your models here.
class ActorAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'actor_name')
    list_display_links = ('id', 'username')
    search_fields = ('username', 'actor_name')
    list_per_page = 25

admin.site.register(Actor, ActorAdmin)