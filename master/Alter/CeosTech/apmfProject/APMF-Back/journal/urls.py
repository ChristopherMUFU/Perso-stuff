from django.urls import path
from journal.views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # List views
    path('', JournalList.as_view()),

    # Detail views
    path('<int:pk>/', JournalDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
