# Generated by Django 3.1.6 on 2021-08-24 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0066_auto_20210824_1043'),
    ]

    operations = [
        migrations.AddField(
            model_name='supplement',
            name='sup_family',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
