from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Actor

# Create your views here.
def actor(request):
    if request.method == 'POST':
        actor_name = request.POST['actor_name']
        actor_id = request.POST['actor_id']
        actor_picture = request.POST['actor_picture']
        username = request.POST['username']
        user_id = request.POST['user_id']

        if Actor.objects.filter(user_id=user_id, actor_id=actor_id).exists():
            messages.error(request, 'You already like this actor!')
            return redirect('result')

        actor = Actor(actor_name=actor_name, actor_id=actor_id, actor_picture=actor_picture, username=username, user_id=user_id)
        actor.save()

        return redirect('result')

def unlike_actor(request):
    if request.method == 'POST':
        actor_id = request.POST['actor_id']
        user_id = request.POST['user_id']

        item = Actor.objects.get(actor_id=actor_id, user_id=request.user.id)
        if request.user.id == item.user_id:
            Actor.objects.filter(actor_id=actor_id).delete()
            return redirect('result')