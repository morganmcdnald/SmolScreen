from django.shortcuts import render, get_object_or_404
from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile
from reviews.models import Review
from favourites.models import Favourite
from follows.models import Follow
from actors.models import Actor
from lists.models import List
from http import cookies
import os
import requests

# Create your views here.
def profile(request, user_id):
    viewusers = Profile.objects.filter(user_id=user_id)
    reviews = Review.objects.order_by('-review_date').filter(user_id=user_id)
    reviews_count = Review.objects.order_by('-review_date').filter(user_id=user_id).count()
    favourites = Favourite.objects.order_by('id').filter(user_id=user_id)
    favourites_count = Favourite.objects.order_by('id').filter(user_id=user_id).count
    user_actors = Actor.objects.order_by('id').filter(user_id=user_id)
    actors_count = Actor.objects.order_by('id').filter(user_id=user_id).count()
    lists = List.objects.filter(owner_id=user_id).distinct('list_name').exclude(title_name='')
    lists_count = List.objects.filter(owner_id=user_id).distinct('list_name').count()
    does_follow = Follow.objects.filter(following_user_id=user_id, user_id=request.user.id).exists()
    following = Follow.objects.order_by('-created').filter(user_id=user_id)
    following_count = Follow.objects.order_by('-created').filter(user_id=user_id).count()
    followers = Follow.objects.order_by('-created').filter(following_user_id=user_id)
    followers_count = Follow.objects.order_by('-created').filter(following_user_id=user_id).count()
    context = {
        'viewusers': viewusers,
        'reviews': reviews,
        'favourites': favourites,
        'actors': user_actors,
        'lists': lists,
        'reviews_count': reviews_count,
        'favourites_count': favourites_count,
        'actors_count': actors_count,
        'lists_count': lists_count,
        'does_follow': does_follow,
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/profile.html', context)

def view_user_followers(request, user_id):
    selected_user = Profile.objects.filter(user_id=user_id)
    following_count = Follow.objects.order_by('-created').filter(user_id=user_id).count()
    followers = Follow.objects.order_by('-created').filter(following_user_id=user_id)
    followers_count = Follow.objects.order_by('-created').filter(following_user_id=user_id).count()
    context = {
        'selected_user': selected_user,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/user_followers.html', context)

def view_user_following(request, user_id):
    selected_user = Profile.objects.filter(user_id=user_id)
    following_count = Follow.objects.order_by('-created').filter(user_id=user_id).count()
    following = Follow.objects.order_by('-created').filter(user_id=user_id)
    followers_count = Follow.objects.order_by('-created').filter(following_user_id=user_id).count()
    context = {
        'selected_user': selected_user,
        'following': following,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/user_following.html', context)

def view_user_list(request, user_id, list_name):
    chosen_list = List.objects.order_by('id').filter(owner_id=user_id, list_name=list_name).exclude(title_name='')
    context = {
        'chosen_list': chosen_list
    }
    return render(request, 'accounts/view_user_list.html', context)