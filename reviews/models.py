from django.db import models
from datetime import datetime

# Create your models here.
class Review(models.Model):
    media_title = models.CharField(max_length=200)
    media_id = models.IntegerField()
    media_type = models.CharField(max_length=100, blank=True)
    media_poster = models.CharField(max_length=200, blank=True)
    username = models.CharField(max_length=200)
    review_title = models.CharField(max_length=200)
    review_content = models.TextField()
    rating = models.IntegerField(default=0)
    review_date = models.DateTimeField(default=datetime.now, blank=True)
    user_id = models.IntegerField(blank=True)
    user_image_url = models.CharField(max_length=300, blank=True)
    def __str__(self):
        return self.review_title
