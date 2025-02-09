# Generated by Django 4.2.13 on 2024-06-02 18:24

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ('fitnessclub', '0003_location_latitude_location_longitude'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='StudioImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ForeignKey(on_delete=django.db.models.expressions.Case, to='fitnessclub.image')),
                ('studio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitnessclub.studio')),
            ],
        ),
        migrations.AddField(
            model_name='studio',
            name='images',
            field=models.ManyToManyField(through='fitnessclub.StudioImage', to='fitnessclub.image'),
        ),
    ]
