from django.shortcuts import render, get_object_or_404
from reviews.models import Review
from favourites.models import Favourite
from lists.models import List
from actors.models import Actor
from http import cookies
import os
import requests
from reviews.choices import rating_choices

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

def result(request):
    cookie = request.COOKIES['movieId']
    reviews = Review.objects.order_by('-review_date').filter(media_id=cookie)[:3]
    is_liked = Favourite.objects.filter(media_id=cookie, user_id=request.user.id).exists()
    actor_is_liked = Actor.objects.filter(user_id=request.user.id, actor_id=cookie).exists()
    lists = List.objects.filter(owner_id=request.user.id).distinct('list_name')
    context = {
        'reviews': reviews,
        'rating_choices': rating_choices,
        'is_liked': is_liked,
        'actor_is_liked': actor_is_liked,
        'lists': lists
    }
    return render(request, 'pages/result.html', context)

def search(request):
    return render(request, 'pages/search.html')

def title(request, media_id):
    media_title = get_object_or_404(Review, media_id=media_id)
    context = {
        'media': media_title
    }
    return render(request, 'pages/title.html', context)