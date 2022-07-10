from rest_framework import serializers
from public_api.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {"required": False,"allow_null": True, 'write_only': True}}
        extra_kwargs = {"username": {"required": False, "allow_null": True}}
        #extra_kwargs = {"forgotKey": {"required": False, "allow_null": True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.pop('username')
        user = User(**validated_data)
        user.set_password(password)
        user.username = username
        user.save()
        return user

    # Update à faire

    def get_validation_exclusions(self):
        exclusions = super(UserSerializer, self).get_validation_exclusions()
        return exclusions + ['username', 'password']


class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = '__all__'


class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe
        fields = '__all__'
