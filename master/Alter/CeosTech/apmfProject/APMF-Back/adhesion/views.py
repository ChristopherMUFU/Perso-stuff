import string
from random import choices
from rest_framework import generics, serializers, status, permissions
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import stripe
from functools import reduce
from django.conf import settings
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


# Create your views here.
# clé de tests
stripe.api_key = settings.STRIPE_TSK


class CreateClientSecret(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        try:
            paymentIntent = stripe.PaymentIntent.create(
                amount=request.data.get('amount', 0),
                currency='eur', receipt_email=request.data.get('email')
            )
            return Response({"clientSecret": paymentIntent['client_secret']})
        except Exception as e:
            return Response({"error": str(e)})


class ListStripeTransactions(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        try:
            transactions = stripe.BalanceTransaction.list(
                created=request.data.get('date'))

            def calcul_prix_avec_frais(item):
                prix_en_euros = (item.amount) / 100
                return prix_en_euros
            amount = reduce(lambda acc, item: acc +
                            calcul_prix_avec_frais(item), transactions.data, 0)
            nb_Adhesions = len(transactions['data'])
            return Response({"amount": amount,
                             "nb_Adhesions": nb_Adhesions,
                             })
        except Exception as e:
            return Response({"error": str(e)})


class AdhesionView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Adhesion.objects.all()
    serializer_class = AdhesionSerializer

    def filter_queryset(self, queryset):
        queryset = super(AdhesionView, self).filter_queryset(queryset)
        return queryset.order_by('-id')


# Ajouté
class AdhesionDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = Adhesion.objects.all()
    serializer_class = AdhesionSerializer


class AdhesionCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AdhesionSerializer
    queryset = Adhesion.objects.all()

    def post(self, request, format=None):
        adherent = Adherent.objects.create(**request.data.get('adherent'))
        while True:
            code = ''.join(
                choices(string.ascii_uppercase + '0123456789', k=5))
            if Adhesion.objects.filter(reference=code).count() == 0:
                break

        adhesion = Adhesion.objects.create(
            adherent=adherent,
            montant=request.data.get('montant'),
            reference=code
        )
        return Response(self.serializer_class(adhesion).data, status=status.HTTP_201_CREATED)
