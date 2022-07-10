from django.db import models


class Adherent(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField()
    telephone = models.CharField(max_length=20)
    adresse = models.CharField(max_length=250)
    ville = models.CharField(max_length=32)
    pays = models.CharField(default="fr", max_length=40)
    code_postale = models.CharField(max_length=32, null=False)
    news_letter = models.BooleanField(default=False)
    position = models.CharField(max_length=120)

    def __str__(self):
        return self.nom + ' ' + self.prenom


class Adhesion(models.Model):
    date_adhesion = models.DateTimeField(auto_now_add=True)
    adherent = models.ForeignKey(Adherent, on_delete=models.CASCADE, null=True)
    montant = models.FloatField(null=False)
    reference = models.CharField(default='', max_length=5, null=True)
    vu = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)
