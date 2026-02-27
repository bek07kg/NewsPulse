from django.contrib import admin # type: ignore
from .models import Category, News

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'color')
    prepopulated_fields = {'slug': ('name',)}  # slug автоматически из name

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'priority', 'created_at', 'views')
    list_filter = ('category', 'priority', 'created_at')
    search_fields = ('title', 'content')
    list_editable = ('priority',)  # можно менять приоритет прямо в списке
    readonly_fields = ('views',)
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'content', 'excerpt', 'category')
        }),
        ('Медиа', {
            'fields': ('image', 'image_url')
        }),
        ('Настройки', {
            'fields': ('priority', 'created_at')
        }),
        ('Статистика', {
            'fields': ('views',)
        }),
    )
