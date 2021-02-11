from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Review

# Create your views here.
def review(request):
    if request.method == 'POST':
        media_title = request.POST['media_title']
        media_id = request.POST['media_id']
        media_type = request.POST['media_type']
        media_poster = request.POST['media_poster']
        username = request.POST['username']
        review_title = request.POST['review_title']
        review_content = request.POST['review_content']
        rating = request.POST['rating']
        user_id = request.POST['user_id']
        user_image_url = request.POST['user_image_url']

        review = Review(media_title=media_title, media_id=media_id, media_type=media_type, media_poster=media_poster, username=username, review_title=review_title, review_content=review_content, rating=rating, user_id=user_id, user_image_url=user_image_url)
        review.save()

        messages.success(request, 'Your review was added successfully')
        return redirect('result')