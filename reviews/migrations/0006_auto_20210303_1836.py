# Generated by Django 3.1.6 on 2021-03-03 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0005_review_media_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]