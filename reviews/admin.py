from django.contrib import admin
from .models import Review

# Register your models here.
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'review_title', 'media_title', 'review_date')
    list_display_links = ('id', 'username', 'review_title')
    search_fields = ('username', 'media_id', 'review_date')
    list_per_page = 25

admin.site.register(Review, ReviewAdmin)