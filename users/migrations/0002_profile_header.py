# Generated by Django 3.1.6 on 2021-02-09 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='header',
            field=models.ImageField(default='defaultHeader.jpg', upload_to='header_pics'),
        ),
    ]