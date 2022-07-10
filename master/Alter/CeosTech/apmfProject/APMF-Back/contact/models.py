from django.db import models
from django.conf import settings

# Create your models here.


class Contact(models.Model):
    prenom = models.CharField(blank=False, null=False, max_length=30)
    nom = models.CharField(blank=False, null=False, max_length=30)
    email = models.EmailField(blank=False, null=False)
    objet = models.CharField(blank=False, null=False, max_length=100)
    message = models.TextField(blank=False, null=False)
    date_envoie = models.DateTimeField(auto_now_add=True)
    vu = models.BooleanField(default=False, null=True)
