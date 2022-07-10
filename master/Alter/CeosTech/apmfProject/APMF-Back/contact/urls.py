from django.urls import path
from contact.views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # List views
    path('', ContactList.as_view()),
    # Detail views
    path('<int:pk>/', ContactDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
