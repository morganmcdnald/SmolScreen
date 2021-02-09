from django.shortcuts import render, get_object_or_404
from reviews.models import Review
from http import cookies
import os
import requests

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

def result(request):
    cookie = request.COOKIES['movieId']
    reviews = Review.objects.order_by('-review_date').filter(media_id=cookie)
    context = {
        'reviews': reviews
    }
    return render(request, 'pages/result.html', context)

def search(request):
    return render(request, 'pages/search.html')