from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from article.serializers import *
from article.models import *
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.


class ArticleList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ['date_publication']

    def filter_queryset(self, queryset):
        queryset = super(ArticleList, self).filter_queryset(queryset)
        return queryset.order_by('-id')


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
