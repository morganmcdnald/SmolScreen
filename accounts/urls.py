from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
    path('account', views.account, name='account'),
    path('editDetails', views.editDetails, name='editDetails'),
    path('view_followers', views.view_followers, name='view_followers'),
    path('view_following', views.view_following, name='view_following')
]