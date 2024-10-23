from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TravelInfo, Profile

class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)  # 使头像字段可选
    
    class Meta:
        model = Profile
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        # 创建用户
        user = User.objects.create_user(**validated_data)

        # 创建或更新 Profile
        if profile_data:
            Profile.objects.update_or_create(user=user, defaults=profile_data)

        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance



    

class TravelInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelInfo
        fields = [
            'id', 'title', 'level', 'province', 'star', 
            'detailAddress', 'shortIntro', 'detailUrl', 
            'score', 'price', 'commentsLen', 'detailIntro', 
            'img_list', 'comments', 'cover', 'discount', 'saleCount'
        ]


