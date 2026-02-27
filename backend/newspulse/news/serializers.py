from rest_framework import serializers # type: ignore
from .models import Category, News

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'color']

class NewsSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'excerpt', 
            'category', 'category_id', 'image', 'image_url',
            'priority', 'created_at', 'views'
        ]
