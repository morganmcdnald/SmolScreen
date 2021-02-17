from django.urls import path
from . import views

urlpatterns = [
    path('review', views.review, name='review'),
    path('delete_review', views.delete_review, name='delete_review')
]