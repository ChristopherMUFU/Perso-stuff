from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.pop('username')
        user = User(**validated_data)
        user.set_password(password)
        user.username = username
        user.save()
        return user

    def get_validation_exclusions(self):
        exclusions = super(UserSerializer, self).get_validation_exclusions()
        return exclusions + ['username', 'password']
