# Generated by Django 3.1.6 on 2021-03-14 14:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0027_auto_20210314_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='image',
            field=models.ImageField(null=True, upload_to='static/images'),
        ),
        migrations.CreateModel(
            name='ApparteniAuCategorie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categorie', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurant.categorie')),
            ],
        ),
        migrations.AddField(
            model_name='menu',
            name='categorie',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurant.apparteniaucategorie'),
        ),
    ]