from rest_framework import serializers
from contact.models import *
from .models import *


class ContactSerializer(serializers.ModelSerializer):
    #   date_publication = serializers.DateField(format="%d/%m/%Y", input_formats="%d/%m/%Y")

    class Meta:
        model = Contact
        fields = ["id",
                  'prenom',
                  "nom",
                  "email",
                  "objet",
                  "message",
                  "date_envoie",
                  "vu"
                  ]
