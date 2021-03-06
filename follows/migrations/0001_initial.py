# Generated by Django 3.1.6 on 2021-02-12 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('username', models.CharField(max_length=200)),
                ('picture', models.CharField(max_length=200)),
                ('following_user_id', models.IntegerField()),
                ('following_username', models.CharField(max_length=200)),
                ('following_picture', models.CharField(max_length=200)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
