from django.urls import path
from . import views

urlpatterns = [
    path('list', views.list, name='list'),
    path('delete_list', views.delete_list, name='delete_list'),
    path('delete_list_item', views.delete_list_item, name='delete_list_item')
]