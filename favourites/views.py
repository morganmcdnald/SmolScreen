from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Favourite

# Create your views here.
def favourite(request):
    if request.method == 'POST':
        media_title = request.POST['media_title']
        media_id = request.POST['media_id']
        media_type = request.POST['media_type']
        media_poster = request.POST['media_poster']
        username = request.POST['username']
        user_id = request.POST['user_id']

        if Favourite.objects.filter(user_id=user_id, media_id=media_id).exists():
            messages.error(request, 'You have already liked this title.')
            return redirect('result')

        favourite = Favourite(media_title=media_title, media_id=media_id, media_type=media_type, media_poster=media_poster, username=username, user_id=user_id)
        favourite.save()

        messages.success(request, 'Your like was added successfully.')
        return redirect('result')

def unlike(request):
    if request.method == 'POST':
        media_id = request.POST['media_id']
        user_id = request.POST['user_id']

        item = Favourite.objects.get(media_id=media_id)
        if request.user.id == item.user_id:
            Favourite.objects.filter(media_id=media_id).delete()
            messages.success(request, 'Your like was removed successfully.')
            return redirect('result')