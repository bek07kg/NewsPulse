import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { newsApi, categoryApi, Category, NewsItem } from '../services/api';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [cats, categoryNews] = await Promise.all([
           categoryApi.getAll(),
           slug ? newsApi.getByCategory(slug) : Promise.resolve([])
        ]);
        setCategories(cats);
        setNews(categoryNews);
        if (slug) {
           setCurrentCategory(cats.find(c => c.slug === slug) || null);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Только что';
    if (diffHours < 24) return `${diffHours} часа назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <>
      <Header categories={categories} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-white mb-8">
          {currentCategory ? currentCategory.name : 'Категория'}
        </h1>
        
        {isLoading ? (
          <div className="text-center py-12"><p className="text-gray-400">Загрузка...</p></div>
        ) : news.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-400">Новостей нету</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="group cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-lg mb-3">
                  <img
                    src={item.image_url || item.image || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span 
                    className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded"
                    style={{ backgroundColor: item.category?.color || '#DC2626' }}
                  >
                    {item.category?.name || 'НОВОСТИ'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={14} className="mr-2 flex-shrink-0" />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
