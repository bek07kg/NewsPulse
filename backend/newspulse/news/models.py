from django.db import models # type: ignore
from django.utils import timezone # type: ignore

class Category(models.Model):
    """Категории новостей (Спорт, Технологии, Бизнес и т.д.)"""
    name = models.CharField(max_length=100)  # Название категории
    slug = models.SlugField(unique=True)      # URL-адрес категории (sport, tech)
    color = models.CharField(max_length=20, default='#3B82F6')  # Цвет для фронтенда
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name

class News(models.Model):
    """Новости"""
    PRIORITY_CHOICES = [
        (3, '🔥 Главная'),      # только 1 новость с таким приоритетом
        (2, '📌 Важная'),       # несколько важных
        (1, '📰 Обычная'),      # все остальные
    ]
    
    title = models.CharField(max_length=200)  # Заголовок
    content = models.TextField()               # Полный текст
    excerpt = models.TextField(max_length=300, blank=True)  # Краткое описание
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        related_name='news'
    )
    image = models.ImageField(upload_to='news/', blank=True, null=True)  # Картинка
    image_url = models.URLField(blank=True, null=True)  # Если картинка из интернета
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)  # Счетчик просмотров
    
    class Meta:
        verbose_name_plural = "News"
        ordering = ['-priority', '-created_at']  # Сначала главные, потом по дате
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Если нет краткого описания, создаем из первых 300 символов текста
        if not self.excerpt and self.content:
            self.excerpt = self.content[:300] + '...'
        super().save(*args, **kwargs)

