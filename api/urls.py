from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'patients', PatientViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomAuthToken.as_view(), name='api_token_auth'),
]

