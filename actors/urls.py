from django.urls import path
from . import views

urlpatterns = [
    path('actor', views.actor, name='actor'),
    path('unlike_actor', views.unlike_actor, name='unlike_actor')
]