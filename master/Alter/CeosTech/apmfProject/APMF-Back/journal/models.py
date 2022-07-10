from django.db import models
from django.conf import settings


class Journal(models.Model):
    titre = models.CharField(blank=False, null=False, max_length=100)
    journal = models.FileField(
        upload_to='files/journaux', blank=True, null=True
    )
    text = models.TextField(blank=False, null=False)
    date_publication = models.DateTimeField()
    photo = models.ImageField(
        upload_to='images/articles', blank=True, null=True
    )
