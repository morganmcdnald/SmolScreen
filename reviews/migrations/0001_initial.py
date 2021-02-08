# Generated by Django 3.1.6 on 2021-02-08 22:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('media_title', models.CharField(max_length=200)),
                ('media_id', models.IntegerField()),
                ('username', models.CharField(max_length=200)),
                ('review_title', models.CharField(max_length=200)),
                ('review_content', models.TextField()),
                ('review_date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('user_id', models.IntegerField(blank=True)),
            ],
        ),
    ]
