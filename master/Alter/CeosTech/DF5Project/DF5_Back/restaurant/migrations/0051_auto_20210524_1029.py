# Generated by Django 3.1.6 on 2021-05-24 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0050_auto_20210521_1230'),
    ]

    operations = [
        migrations.RenameField(
            model_name='supplement',
            old_name='est_frite',
            new_name='sup_burgers_sandwichs_assiettes',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_menu_burgers',
            new_name='sup_frite',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_menu_sandwichs_au_four',
            new_name='sup_milshake_crepe',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_menu_sandwichs_crepe_salee',
            new_name='sup_pizzas',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_menu_tacos',
            new_name='sup_salade',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_milshake_crepe',
            new_name='sup_smoothie',
        ),
        migrations.RenameField(
            model_name='supplement',
            old_name='est_pizzas',
            new_name='sup_tacos',
        ),
        migrations.RemoveField(
            model_name='supplement',
            name='description',
        ),
        migrations.RemoveField(
            model_name='supplement',
            name='est_smoothie',
        ),
        migrations.AddField(
            model_name='supplement',
            name='type_supplement',
            field=models.CharField(blank=True, choices=[('Pain', 'pain'), ('Viande', 'viande'), ('Sauce', 'sauce'), ('Crudite', 'crudite')], max_length=100, null=True),
        ),
    ]
