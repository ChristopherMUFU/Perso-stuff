from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ManyToManyField
from django.utils import timezone
# Create your models here.


class Admin_account(models.Model):  # Ajouter à l'admin Django
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)


class Info_Restaurant(models.Model):
    disponibilite_restaurant = models.BooleanField(default=False, null=True)
    disponibilite_livraison = models.BooleanField(default=False, null=True)


class Categorie(models.Model): # Entrée/Plats/Dessert/
    nom = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nom


class Produit(models.Model):
    # Champs commun pour tous les produits du restaurant
    nom = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    categorie = models.ForeignKey(
        Categorie, null=True, on_delete=models.CASCADE, blank=True)
    image = models.ImageField(null=True, upload_to='static/images')
    prix = models.FloatField(default=0, blank=True)
    disponibilite = models.BooleanField(default=False, null=True)

    # Champs spécifiques
    sur_grill = models.BooleanField(default=False, null=True)
    au_menu = models.BooleanField(default=False, null=True)
    accompagnement = models.BooleanField(default=False, null=True)
    supplement = models.BooleanField(default=False, null=True)

    # Champs spécifiques aux suppléments
    prix_supplement = models.FloatField(default=1.5)


    def __str__(self):
        return self.nom

############################################ Non utilisé #######################################################

class Accompagnement(models.Model): #### migrations
    nom = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, upload_to='static/images')
    prix = models.FloatField(default=0, blank=True)

    def __str__(self):
        return self.nom


class MenuChoixProduit(models.Model):
    produit = models.ForeignKey(
        Produit,  null=True, on_delete=models.SET_NULL, blank=True)
    supplement = models.FloatField(default=0)
    categorie = models.ForeignKey(
        Categorie,  null=True, on_delete=models.SET_NULL, blank=True)

    def __str__(self):
        return self.produit.nom


class Menu(models.Model):
    nom = models.CharField(max_length=80, unique=True)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, upload_to='static/images')
    prix = models.FloatField(default=0, blank=True)
    disponibilite = models.BooleanField(default=False, null=True)
    choix_produits = models.ManyToManyField(MenuChoixProduit, blank=True)
    categories_produits = models.ManyToManyField(Categorie, blank=True)

    def __str__(self):
        return self.nom

    def get_categorie(self):
        return AppartenirAuCategorie.objects.get(menus__id=self.id).categorie.nom


class AppartenirAuCategorie(models.Model):
    categorie = models.ForeignKey(
        Categorie, null=True, on_delete=models.SET_NULL, blank=True)
    menus = models.ManyToManyField(Menu, blank=True)

################################################################################################################


class FormulaireContact(models.Model):
    nom = models.CharField(max_length=26)
    prenom = models.CharField(max_length=26)
    societe = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    prestation = models.CharField(max_length=20, default='Autres')
    message = models.TextField()
    date_message = models.DateTimeField(default=timezone.now(), blank=True)
