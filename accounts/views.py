from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth.models import User
from users.forms import UserUpdateForm, ProfileUpdateForm
from reviews.models import Review

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
    context = {
        'reviews': user_reviews
    }
    return render(request, 'accounts/account.html', context)

def editDetails(request):
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
        'p_form': p_form
    }
    return render(request, 'accounts/editDetails.html', context)