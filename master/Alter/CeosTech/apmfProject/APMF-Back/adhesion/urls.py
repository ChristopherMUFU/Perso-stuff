from django.urls import path

from . import views

app_name = 'adhesion'


urlpatterns = [
    path('', views.AdhesionView.as_view()),
    path('<int:pk>/', views.AdhesionDetailView.as_view()),
    path('create-adhesion/', views.AdhesionCreateView.as_view()),
    path('create-client-secret/', views.CreateClientSecret.as_view()),
    path('stripe/transactions',
         views.ListStripeTransactions.as_view()),
]
