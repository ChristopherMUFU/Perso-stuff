from django.urls import path
from public_api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('user_create/', UserCreateView.as_view()),
    path('user_account/', UserListView.as_view()),
    path('user_account/<int:pk>/', UserDetailView.as_view()),

    path('profil/', ProfilListView.as_view()),
    path('profil/<int:pk>/', ProfilDetailView.as_view()),

    path('groupe/', GroupeListView.as_view()),
    path('groupe/<int:pk>/', GroupeDetailView.as_view()),

    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
