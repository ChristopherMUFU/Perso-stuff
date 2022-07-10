from rest_framework import serializers
from .models import *


class AdherentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adherent
        fields = "__all__"


class AdhesionSerializer(serializers.ModelSerializer):
    adherent = AdherentSerializer()

    class Meta:
        model = Adhesion
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
        adherent_data = validated_data.pop('adherent')
        adherent = Adherent.objects.create(**adherent_data)
        adhesion = Adhesion.objects.create(
            **validated_data, adherent=adherent)
        return adhesion

    
