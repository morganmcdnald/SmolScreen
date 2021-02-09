from django import forms
from django.contrib.auth.models import User
from .models import Profile

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean_email(self):
        val = self.cleaned_data['email']
        if User.objects.exclude(pk=self.instance.pk).filter(email__iexact=val):
            raise forms.ValidationError(('Email is already in use.'))
        return val


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['bio', 'image', 'header']