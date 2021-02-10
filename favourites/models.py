from django.db import models

# Create your models here.
class Favourite(models.Model):
    media_title = models.CharField(max_length=200)
    media_id = models.IntegerField()
    media_type = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=200)
    user_id = models.IntegerField()
    def __str__(self):
        return self.media_title