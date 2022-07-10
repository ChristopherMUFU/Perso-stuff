from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from contact.serializers import *
from contact.models import *
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.


class ContactList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = (filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ['date_envoie']

    def filter_queryset(self, queryset):
        queryset = super(ContactList, self).filter_queryset(queryset)
        return queryset.order_by('-id')


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
