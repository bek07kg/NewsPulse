from django.urls import path, include # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore
from . import views

router = DefaultRouter()
router.register(r'news', views.NewsViewSet)
router.register(r'categories', views.CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
