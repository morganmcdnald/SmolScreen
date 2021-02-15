from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>', views.profile, name='profile'),
    path('<int:user_id>/view_user_followers', views.view_user_followers, name='view_user_followers'),
    path('<int:user_id>/view_user_following', views.view_user_following, name='view_user_following'),
    path('<int:user_id>/<str:list_name>/view_user_list', views.view_user_list, name='view_user_list')
]