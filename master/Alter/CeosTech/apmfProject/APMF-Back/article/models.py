from django.db import models
from django.conf import settings

# Create your models here.


class Article(models.Model):
    titre = models.CharField(blank=False, null=False, max_length=100)
    document = models.FileField(
        upload_to='files/articles', blank=True, null=True
    )
    auteur = models.CharField(blank=False, null=False, max_length=45)
    description = models.TextField(
        blank=True, null=True, default="")
    text = models.TextField(blank=False, null=False)
    date_publication = models.DateTimeField()
    photo = models.ImageField(
        upload_to='images/articles', blank=True, null=True)
