from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth.models import User
from users.forms import UserUpdateForm, ProfileUpdateForm
from reviews.models import Review
from favourites.models import Favourite
from follows.models import Follow
from actors.models import Actor
from lists.models import List

# Create your views here.
def register(request):
    if request.method == 'POST':
        # Get form values
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        # Check if passwords match
        if password == password2:
            # Check that username is not taken
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username is already taken')
                return redirect('register')
            else:
                # Check that email is not taken
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'Email is already in use')
                    return redirect('register')
                else:
                    # Checks passed
                    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
                    # Login after Register
                    auth.login(request, user)
                    messages.success(request, 'Account Created Successfully. Now Logged In')
                    return redirect('account')
        else:
            messages.error(request, 'Passwords must match')
            return redirect('register')
    else:
        return render(request, 'accounts/register.html')

def login(request):
    if request.method == 'POST':
        # Login User
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            messages.success(request, ' You are now logged in')
            return redirect('account')
        else:
            messages.error(request, 'Invalid Username/Password')
            return redirect('login')
    else:
        return render(request, 'accounts/login.html')

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        messages.success(request, 'You were successfully logged out')
        return redirect('index')

def account(request):
    user_reviews = Review.objects.order_by('-review_date').filter(user_id=request.user.id)
    reviews_count = Review.objects.order_by('-review_date').filter(user_id=request.user.id).count()
    user_favourites = Favourite.objects.order_by('id').filter(user_id=request.user.id)
    favourites_count = Favourite.objects.order_by('id').filter(user_id=request.user.id).count()
    user_actors = Actor.objects.order_by('id').filter(user_id=request.user.id)
    actors_count = Actor.objects.order_by('id').filter(user_id=request.user.id).count()
    lists = List.objects.filter(owner_id=request.user.id).distinct('list_name').exclude(title_name='')
    lists_count = List.objects.filter(owner_id=request.user.id).distinct('list_name').count()
    following = Follow.objects.order_by('created').filter(user_id=request.user.id)
    following_count = Follow.objects.order_by('created').filter(user_id=request.user.id).count()
    followers = Follow.objects.order_by('created').filter(following_user_id=request.user.id)
    followers_count = Follow.objects.order_by('created').filter(following_user_id=request.user.id).count()
    context = {
        'reviews': user_reviews,
        'reviews_count': reviews_count,
        'favourites': user_favourites,
        'favourites_count': favourites_count,
        'actors': user_actors,
        'actors_count': actors_count,
        'lists': lists,
        'lists_count': lists_count,
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/account.html', context)

def editDetails(request):
    following = Follow.objects.order_by('created').filter(user_id=request.user.id)
    following_count = Follow.objects.order_by('created').filter(user_id=request.user.id).count()
    followers = Follow.objects.order_by('created').filter(following_user_id=request.user.id)
    followers_count = Follow.objects.order_by('created').filter(following_user_id=request.user.id).count()
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your details were updated successfully')
            return redirect('account')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form,
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/editDetails.html', context)

def view_followers(request):
    followers = Follow.objects.order_by('created').filter(following_user_id=request.user.id)
    followers_count = Follow.objects.order_by('created').filter(following_user_id=request.user.id).count()
    following = Follow.objects.order_by('created').filter(user_id=request.user.id)
    following_count = Follow.objects.order_by('created').filter(user_id=request.user.id).count()
    context = {
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/followers.html', context)

def view_following(request):
    followers = Follow.objects.order_by('created').filter(following_user_id=request.user.id)
    followers_count = Follow.objects.order_by('created').filter(following_user_id=request.user.id).count()
    following = Follow.objects.order_by('created').filter(user_id=request.user.id)
    following_count = Follow.objects.order_by('created').filter(user_id=request.user.id).count()
    context = {
        'following': following,
        'followers': followers,
        'following_count': following_count,
        'followers_count': followers_count
    }
    return render(request, 'accounts/following.html', context)

def view_list(request, list_name):
    chosen_list = List.objects.order_by('id').filter(owner_id=request.user.id, list_name=list_name)
    context = {
        'chosen_list': chosen_list
    }
    return render(request, 'accounts/view_list.html', context)