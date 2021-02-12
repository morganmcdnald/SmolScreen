from django.shortcuts import render, get_object_or_404
from .forms import UserUpdateForm, ProfileUpdateForm
from .models import Profile
from reviews.models import Review
from favourites.models import Favourite

# Create your views here.
def profile(request, user_id):
    viewusers = Profile.objects.filter(user_id=user_id)
    reviews = Review.objects.order_by('-review_date').filter(user_id=user_id)
    favourites = Favourite.objects.order_by('id').filter(user_id=user_id)
    context = {
        'viewusers': viewusers,
        'reviews': reviews,
        'favourites': favourites
    }
    return render(request, 'accounts/profile.html', context)