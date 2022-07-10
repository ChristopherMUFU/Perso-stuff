from django.contrib import admin
from restaurant.models import *


class ProduitAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'categorie', 'disponibilite')


class CategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom')


class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'prix', 'get_categorie', 'disponibilite')


class AppartenirAuCategorieAdmin(admin.ModelAdmin):
    list_display = ('id', 'categorie')


# Register your models here.
admin.site.register(Categorie)
admin.site.register(Produit)
admin.site.register(Menu)
admin.site.register(MenuChoixProduit)
admin.site.register(FormulaireContact)
admin.site.register(AppartenirAuCategorie)
admin.site.register(Info_Restaurant)

