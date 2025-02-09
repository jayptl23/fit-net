# Generated by Django 4.2.13 on 2024-05-31 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fitnessclub', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='StudioAmenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('amenity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitnessclub.amenity')),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitnessclub.studio')),
            ],
            options={
                'unique_together': {('studio', 'amenity')},
            },
        ),
        migrations.AddField(
            model_name='studio',
            name='amenities',
            field=models.ManyToManyField(through='fitnessclub.StudioAmenity', to='fitnessclub.amenity'),
        ),
    ]
