from django.db import models
from django.contrib.auth.models import User

# Create your models here.

    
class Profil(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100, null=True)
    prenom = models.CharField(max_length=100, null=True)
    age = models.IntegerField(default=0)
    localisation = models.CharField(max_length=150, null=True) #api départements
    description = models.TextField(null=True, blank=True)
    abonnement = models.ManyToManyField("self", blank=True, related_name="abonnement")
    abonne = models.ManyToManyField("self", blank=True,  related_name="abonne")
    demande_abonne = models.ManyToManyField("self", blank=True, related_name="demande_abonne")
    eco_groupe = models.BooleanField(default=False, null=True)
    

class Groupe(models.Model):
    admin = models.ManyToManyField(Profil, blank=True, related_name="admin") #1 seule profil
    nom = models.CharField(max_length=100, null=True)
    localisation = models.CharField(max_length=150, null=True) #api départements
    description = models.TextField(null=True, blank=True) 
    membre = models.ManyToManyField(Profil, blank=True, related_name="membre")
    demande_membre = models.ManyToManyField(Profil, blank=True, related_name="demande_membre")
    eco_groupe = models.BooleanField(default=False, null=True)

    #// voir view ou serializer perso pour les potentiels ecogroupe
    #eg_demande(bool)
    #eg_adresse
    #num_groupe
    #eg_verifie(bool)
    #eg_posts[Posts] // V1
    


