from django.urls import path
from article.views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # List views
    path('', ArticleList.as_view()),

    # Detail views
    path('<int:pk>/', ArticleDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
