# Generated by Django 4.2.13 on 2024-06-08 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fitnessclub', '0008_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='studio',
            name='thumbnail',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='StudioThumbnail', to='fitnessclub.image'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(error_messages={'unique': 'email already in use'}, max_length=254, unique=True),
        ),
    ]
