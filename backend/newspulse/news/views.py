from rest_framework import viewsets # type: ignore
from rest_framework.decorators import action # type: ignore
from rest_framework.response import Response # type: ignore
from .models import News, Category
from .serializers import NewsSerializer, CategorySerializer

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all().order_by('-priority', '-created_at')
    serializer_class = NewsSerializer
    
    @action(detail=False, methods=['get'])
    def homepage(self, request):
        """Специальный эндпоинт для главной страницы"""
        main_news = News.objects.filter(priority=3).first()
        important_news = News.objects.filter(priority=2)[:3]  # 3 важных
        latest_news = News.objects.filter(priority=1)[:5]     # 5 обычных
        
        return Response({
            'main': NewsSerializer(main_news).data if main_news else None,
            'important': NewsSerializer(important_news, many=True).data,
            'latest': NewsSerializer(latest_news, many=True).data,
        })

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
