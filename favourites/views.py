from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Favourite

# Create your views here.
def favourite(request):
    if request.method == 'POST':
        media_title = request.POST['media_title']
        media_id = request.POST['media_id']
        media_type = request.POST['media_type']
        username = request.POST['username']
        user_id = request.POST['user_id']

        if Favourite.objects.filter(user_id=user_id, media_id=media_id).exists():
            messages.error(request, 'You have already liked this title.')
            return redirect('result')

        favourite = Favourite(media_title=media_title, media_id=media_id, media_type=media_type, username=username, user_id=user_id)
        favourite.save()

        messages.success(request, 'Your like was added successfully.')
        return redirect('result')