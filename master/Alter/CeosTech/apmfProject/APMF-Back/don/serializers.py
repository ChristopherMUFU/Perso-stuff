from rest_framework import serializers
from .models import *


class API_keysSerializer(serializers.ModelSerializer):
    class Meta:
        model = API_keys
        fields = "__all__"


class DonneurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donneur
        fields = "__all__"


class DonSerializer(serializers.ModelSerializer):
    donneur = DonneurSerializer()

    class Meta:
        model = Don
        fields = "__all__"

    def update(self, instance, validated_data):
        # donneur_data = validated_data.get("donneur")
        # donneur=instance.donneur

        # instance.montant = validated_data.get("montant", instance.mantant)
        # instance.date_don = validated_data.get("date_don", instance.date_don)
        # instance.reference = validated_data.get(
        #     "reference", instance.reference)
        instance.vu = validated_data.get('vu', instance.vu)
        instance.save()
        return instance

    def create(self, validated_data):
        donneur_data = validated_data.pop('donneur')
        donneur = Donneur.objects.create(**donneur_data)
        don = Don.objects.create(
            **validated_data, donneur=donneur)
        return don
