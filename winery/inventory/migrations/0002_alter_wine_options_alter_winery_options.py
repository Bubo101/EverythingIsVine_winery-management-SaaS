# Generated by Django 4.0.3 on 2022-09-14 22:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='wine',
            options={'ordering': ('year',)},
        ),
        migrations.AlterModelOptions(
            name='winery',
            options={'ordering': ('name',)},
        ),
    ]
