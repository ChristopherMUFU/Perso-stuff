# Generated by Django 3.1.6 on 2021-05-19 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0047_auto_20210519_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produit',
            name='taille_pizza',
            field=models.CharField(blank=True, choices=[('Grande', 'grande'), ('Moyenne', 'moyenne'), ('Petite', 'petite')], max_length=100, null=True),
        ),
    ]
