# Generated by Django 3.1.6 on 2021-04-02 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0041_auto_20210402_1055'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='produit',
            name='nom_accompagnement',
        ),
        migrations.AlterField(
            model_name='produit',
            name='prix_supplement',
            field=models.FloatField(default=0),
        ),
    ]