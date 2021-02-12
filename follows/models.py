from django.db import models

# Create your models here.
class Follow(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(max_length=200)
    picture = models.CharField(max_length=200)
    following_user_id = models.IntegerField()
    following_username = models.CharField(max_length=200)
    following_picture = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)