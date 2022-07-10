from django.urls import path

from . import views
from .views import API_keysDetailView

app_name = 'don'


urlpatterns = [
    path('', views.DonView.as_view()),
    path('<int:pk>/', views.DonDetailView.as_view()),
    path('create-don/', views.DonCreateView.as_view()),
    path('create-client-secret/', views.CreateClientSecret.as_view()),
    path('stripe/transactions',
         views.ListStripeTransactions.as_view()),
]
