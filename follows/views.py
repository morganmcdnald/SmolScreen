from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Follow

# Create your views here.
def follow(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        username = request.POST['username']
        picture = request.POST['picture']
        following_user_id = request.POST['following_user_id']
        following_username = request.POST['following_username']
        following_picture = request.POST['following_picture']

        if Follow.objects.filter(user_id=user_id, following_user_id=following_user_id).exists():
            messages.error(request, 'You already follow this user.')
            return redirect('profile')

        follow = Follow(user_id=user_id, username=username, picture=picture, following_user_id=following_user_id, following_username=following_username, following_picture=following_picture)
        follow.save()

        return redirect('profile', following_user_id)


def unfollow(request):
    if request.method == 'POST':
        user_id = request.POST['user_id']
        following_user_id = request.POST['following_user_id']

        item = Follow.objects.get(following_user_id=following_user_id, user_id=request.user.id)
        if request.user.id == item.user_id:
            Follow.objects.filter(following_user_id=following_user_id, user_id=request.user.id).delete()
            return redirect('profile', following_user_id)