from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')
    header = models.ImageField(default='defaultHeader.jpg', upload_to='header_pics')
    
    def __str__(self):
        return f'{self.user.username} Profile'