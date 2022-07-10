from rest_framework import serializers
from journal.models import *
from .models import *


class JournalSerializer(serializers.ModelSerializer):
    #   date_publication = serializers.DateField(format="%d/%m/%Y", input_formats="%d/%m/%Y")

    class Meta:
        model = Journal
        fields = ["id",
                  'titre',
                  "journal",
                  "text",
                  "date_publication",
                  "photo"
                  ]
