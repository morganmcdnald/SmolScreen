from django.db import models

# Create your models here.
class List(models.Model):
    list_name = models.CharField(max_length=200)
    owner_id = models.IntegerField()
    owner_username = models.CharField(max_length=200)
    title_id = models.IntegerField(blank=True)
    title_name = models.CharField(max_length=200, blank=True)
    title_type = models.CharField(max_length=200, blank=True)
    title_poster = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.list_name