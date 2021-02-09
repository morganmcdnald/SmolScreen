from django.db import models
from datetime import datetime

# Create your models here.
class Review(models.Model):
    media_title = models.CharField(max_length=200)
    media_id = models.IntegerField()
    username = models.CharField(max_length=200)
    review_title = models.CharField(max_length=200)
    review_content = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    review_date = models.DateTimeField(default=datetime.now, blank=True)
    user_id = models.IntegerField(blank=True)
    def __str__(self):
        return self.review_title
