from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout, name='logout'),
    path('account', views.account, name='account'),
    path('editDetails', views.editDetails, name='editDetails')
]