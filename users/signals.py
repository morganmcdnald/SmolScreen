from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile
from lists.models import List


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(post_save, sender=User)
def create_list(sender, instance, created, **kwargs):
    if created:
        List.objects.create(list_name='Watchlist', owner_id=instance.id, owner_username=instance.username, title_id=0, title_name='', title_type='', title_poster='')
