from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

def result(request):
    return render(request, 'pages/result.html')

def search(request):
    return render(request, 'pages/search.html')