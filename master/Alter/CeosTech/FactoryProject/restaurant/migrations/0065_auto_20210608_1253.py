# Generated by Django 3.2.4 on 2021-06-08 10:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0064_auto_20210608_1144'),
    ]

    operations = [
        migrations.RenameField(
            model_name='produit',
            old_name='est_menu_tacos_viande1',
            new_name='est_menu_tacos',
        ),
        migrations.RemoveField(
            model_name='produit',
            name='est_menu_tacos_viande2',
        ),
        migrations.RemoveField(
            model_name='produit',
            name='est_menu_tacos_viande3',
        ),
    ]