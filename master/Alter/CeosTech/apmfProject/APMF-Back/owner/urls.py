from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('', OwnerList.as_view()),
    path('register/', OwnerCreation.as_view()),
    path('<int:pk>/', OwnerDetail.as_view()),
    path('password-reset/', include('django_rest_passwordreset.urls'),
         name="password_reset"),
    # password-reset/confirm/ <= confirmer la modification de mpd
    # JWT urls
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
]
