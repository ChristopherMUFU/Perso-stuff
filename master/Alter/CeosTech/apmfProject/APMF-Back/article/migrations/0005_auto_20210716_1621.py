# Generated by Django 3.1.6 on 2021-07-16 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0004_auto_20210716_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='description',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='text',
            field=models.TextField(max_length=4000),
        ),
    ]
