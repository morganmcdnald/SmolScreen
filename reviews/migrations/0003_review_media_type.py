# Generated by Django 3.1.6 on 2021-02-10 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_review_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='media_type',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
