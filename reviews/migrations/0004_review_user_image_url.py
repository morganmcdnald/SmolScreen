# Generated by Django 3.1.6 on 2021-02-11 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_review_media_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='user_image_url',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
