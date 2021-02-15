from django.db import models

# Create your models here.
class Actor(models.Model):
    actor_name = models.CharField(max_length=200)
    actor_id = models.IntegerField()
    actor_picture = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    user_id = models.IntegerField()
    def __str__(self):
        return self.actor_name