# Generated by Django 4.2.13 on 2024-06-03 19:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fitnessclub', '0004_image_studioimage_studio_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField(max_length=280)),
                ('coach', models.CharField(max_length=30)),
                ('capacity', models.PositiveIntegerField()),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitnessclub.studio')),
            ],
        ),
        migrations.CreateModel(
            name='ClassSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('day', models.CharField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')], max_length=1)),
                ('fitness_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitnessclub.class')),
            ],
        ),
    ]
