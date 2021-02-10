from django.urls import path
from . import views

urlpatterns = [
    path('favourite', views.favourite, name='favourite')
]