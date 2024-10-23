# Generated by Django 5.1.1 on 2024-09-23 07:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "avatar",
                    models.FileField(
                        default="avatar/02.png", upload_to="avatar", verbose_name="头像"
                    ),
                ),
                (
                    "sex",
                    models.CharField(default="", max_length=255, verbose_name="性别"),
                ),
                (
                    "address",
                    models.CharField(default="", max_length=255, verbose_name="地址"),
                ),
                (
                    "textarea",
                    models.CharField(
                        default="这个人很懒，什么有没留下。", max_length=255, verbose_name="个人简介"
                    ),
                ),
                (
                    "createTime",
                    models.DateField(auto_now_add=True, verbose_name="创建时间"),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="User",
        ),
    ]
