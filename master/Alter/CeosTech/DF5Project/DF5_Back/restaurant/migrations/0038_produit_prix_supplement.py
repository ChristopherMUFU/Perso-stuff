# Generated by Django 3.1.6 on 2021-03-29 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0037_auto_20210325_1656'),
    ]

    operations = [
        migrations.AddField(
            model_name='produit',
            name='prix_supplement',
            field=models.FloatField(default=1.5, null=True),
        ),
    ]
