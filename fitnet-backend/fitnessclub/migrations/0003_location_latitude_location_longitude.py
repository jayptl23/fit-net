# Generated by Django 4.2.13 on 2024-06-01 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitnessclub', '0002_amenity_studioamenity_studio_amenities'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='latitude',
            field=models.FloatField(default=40.463955326099516),
        ),
        migrations.AddField(
            model_name='location',
            name='longitude',
            field=models.FloatField(default=-74.41096477481723),
        ),
    ]
