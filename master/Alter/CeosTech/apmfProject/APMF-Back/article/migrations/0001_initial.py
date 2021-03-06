# Generated by Django 3.1.6 on 2021-07-06 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=100)),
                ('Auteur', models.CharField(max_length=45)),
                ('text', models.CharField(max_length=2000)),
                ('date_publication', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True,
                 null=True, upload_to='images/articles')),
            ],
        ),
    ]
