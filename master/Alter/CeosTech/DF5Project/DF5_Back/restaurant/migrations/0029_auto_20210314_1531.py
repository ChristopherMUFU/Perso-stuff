# Generated by Django 3.1.6 on 2021-03-14 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0028_auto_20210314_1526'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menu',
            name='categorie',
        ),
        migrations.AddField(
            model_name='apparteniaucategorie',
            name='menus',
            field=models.ManyToManyField(blank=True, to='restaurant.Menu'),
        ),
    ]
