from rest_framework import generics, status, permissions
from .serializers import *
from .models import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.

class UserCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateAPIView): #RetrieveUpdateDestroyAPIView
    permission_classes = [permissions.AllowAny,]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfilListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer

class ProfilDetailView(generics.RetrieveUpdateAPIView): #RetrieveUpdateDestroyAPIView
    permission_classes = [permissions.AllowAny,]
    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer


class GroupeListView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny,]
    queryset = Groupe.objects.all()
    serializer_class = GroupeSerializer

class GroupeDetailView(generics.RetrieveUpdateDestroyAPIView): 
    permission_classes = [permissions.AllowAny,]
    queryset = Groupe.objects.all()
    serializer_class = GroupeSerializer

# Rajouter les détails
