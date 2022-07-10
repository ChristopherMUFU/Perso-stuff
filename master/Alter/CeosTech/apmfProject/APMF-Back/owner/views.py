from django.contrib.auth.models import User
from django.core import serializers
from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend

permission = permissions.AllowAny


class OwnerCreation(generics.CreateAPIView):
    permission_classes = [permission]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OwnerList(generics.ListCreateAPIView):
    permission_classes = [permission]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email']


class OwnerDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permission]
    queryset = User.objects.all()
    serializer_class = User
