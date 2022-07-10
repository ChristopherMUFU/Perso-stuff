from django.urls import path
from restaurant.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'restaurantApi'


urlpatterns = [
    # /restaurant/carte
    path('info_restaurant/', Info_RestaurantView.as_view()),
    path('info_restaurant/<int:pk>/', Info_RestaurantDetailView.as_view()),
    path('user/', UserCreate.as_view()),
    path('admin_account/', Admin_accountView.as_view()),
    path('admin_account/<int:pk>/', Admin_accountView.as_view()),
    path('categorie/', CategorieView.as_view()),
    path('categorie/<int:pk>/', CategorieDetailView.as_view()),
    path('produit/', ProduitView.as_view()),
    path('produit/<int:pk>/', ProduitDetailsView.as_view()),
    path('categorie-produits/<int:id_categorie>/',
         CategorieAuProduitsView.as_view()),
    path('menu/', MenuView.as_view()),
    path('menu/<int:pk>/', MenuDetailsView.as_view()),
    path('disponibilitePlats/', UpdateProduitDisponibilte.as_view()),
    path('contact/', FormulaireContactView.as_view()),
    path('contact/<int:pk>/', FormulaireContactDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
]
