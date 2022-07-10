from django.shortcuts import render
from journal.serializers import *
from journal.models import *
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.


class JournalList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ['date_publication']

    def filter_queryset(self, queryset):
        queryset = super(JournalList, self).filter_queryset(queryset)
        return queryset.order_by('-id')


class JournalDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
