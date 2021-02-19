from django.shortcuts import render, redirect
from django.contrib import messages
from .models import List

# Create your views here.
def list(request):
    if request.method == 'POST':
        list_name = request.POST['list_name']
        owner_id = request.POST['owner_id']
        owner_username = request.POST['owner_username']
        title_id = request.POST['title_id']
        title_name = request.POST['title_name']
        title_type = request.POST['title_type']
        title_poster = request.POST['title_poster']
        
        userList = List(list_name=list_name, owner_id=owner_id, owner_username=owner_username, title_id=title_id, title_name=title_name, title_type=title_type, title_poster=title_poster)
        userList.save()

        messages.success(request, 'Added to list successfully')
        return redirect('result')

def delete_list(request):
    if request.method == 'POST':
        list_name = request.POST['list_name']
        owner_id = request.POST['owner_id']

        item = List.objects.filter(list_name=list_name, owner_id=owner_id)
        print(item)
        List.objects.filter(list_name=list_name).delete()
        messages.success(request, 'Your list was deleted successfully.')
        return redirect('account')

def delete_list_item(request):
    if request.method == 'POST':
        list_name = request.POST['list_name']
        owner_id = request.POST['owner_id']
        title_id = request.POST['title_id']
        title_name = request.POST['title_name']
        title_type = request.POST['title_type']

        item = List.objects.get(list_name=list_name, owner_id=owner_id, title_id=title_id, title_name=title_name, title_type=title_type)
        print(item)
        List.objects.filter(list_name=list_name, title_id=title_id, title_name=title_name, title_type=title_type).delete()
        messages.success(request, '%s was successfully removed from your list.' % title_name)
        return redirect('account')