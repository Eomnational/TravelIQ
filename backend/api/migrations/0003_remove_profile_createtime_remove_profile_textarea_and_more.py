# Generated by Django 5.1.1 on 2024-09-23 08:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_profile_delete_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="createTime",
        ),
        migrations.RemoveField(
            model_name="profile",
            name="textarea",
        ),
        migrations.AddField(
            model_name="profile",
            name="bio",
            field=models.TextField(
                blank=True, default="这个人很懒，什么也没留下。", max_length=500, verbose_name="个人简介"
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="address",
            field=models.CharField(
                blank=True, default="", max_length=255, verbose_name="地址"
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="sex",
            field=models.CharField(
                blank=True, default="", max_length=255, verbose_name="性别"
            ),
        ),
    ]
