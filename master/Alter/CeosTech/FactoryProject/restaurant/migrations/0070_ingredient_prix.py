# Generated by Django 3.2.2 on 2021-07-06 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0069_alter_produit_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='prix',
            field=models.FloatField(blank=True, default=0),
        ),
    ]