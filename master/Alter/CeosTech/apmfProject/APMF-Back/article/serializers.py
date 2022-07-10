from rest_framework import serializers
from article.models import *
from .models import *


class ArticleSerializer(serializers.ModelSerializer):
    #   date_publication = serializers.DateField(format="%d/%m/%Y", input_formats="%d/%m/%Y")

    class Meta:
        model = Article
        fields = ["id",
                  'titre',
                  "auteur",
                  "document",
                  "description",
                  "text",
                  "date_publication",
                  "photo"
                  ]
# ""
#####
