from django.shortcuts import render, get_object_or_404
from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile
from reviews.models import Review
from favourites.models import Favourite
from follows.models import Follow

# Create your views here.
def profile(request, user_id):
    viewusers = Profile.objects.filter(user_id=user_id)
    reviews = Review.objects.order_by('-review_date').filter(user_id=user_id)
    favourites = Favourite.objects.order_by('id').filter(user_id=user_id)
    does_follow = Follow.objects.filter(following_user_id=user_id, user_id=request.user.id).exists()
    following = Follow.objects.order_by('-created').filter(user_id=user_id)
    following_count = Follow.objects.order_by('-created').filter(user_id=user_id).count()
    followers = Follow.objects.order_by('-created').filter(following_user_id=user_id)
    followers_count = Follow.objects.order_by('-created').filter(following_user_id=user_id).count()
    context = {
        'viewusers': viewusers,
        'reviews': reviews,
        'favourites': favourites,
        'does_follow': does_follow,
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/profile.html', context)