from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import PatientViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'patients', PatientViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', CustomAuthToken.as_view(), name='api_token_auth'),
]

