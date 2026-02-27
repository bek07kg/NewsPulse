import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../services/api';

interface HeroProps {
  mainNews?: NewsItem | null;
  importantNews?: NewsItem[];
  isLoading?: boolean;
}

export default function Hero({ mainNews, importantNews = [], isLoading = false }: HeroProps) {
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Только что';
    if (diffHours < 24) return `${diffHours} часа назад`;
    return date.toLocaleDateString('ru-RU');
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-800 h-32 rounded-lg"></div>
              <div className="bg-gray-800 h-32 rounded-lg"></div>
              <div className="bg-gray-800 h-32 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!mainNews && importantNews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">Жаңылыктар жок</p>
          <p className="text-sm mt-2">Кийинчерээк кириңиз</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Главная новость */}
        {mainNews && (
          <Link to={`/news/${mainNews.id}`} className="relative group cursor-pointer">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <img
                src={mainNews.image_url || mainNews.image || 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={mainNews.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span 
                className="inline-block text-white text-xs font-bold px-3 py-1 mb-3 rounded"
                style={{ backgroundColor: mainNews.category?.color || '#DC2626' }}
              >
                {mainNews.category?.name || 'BREAKING NEWS'}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight line-clamp-2">
                {mainNews.title}
              </h2>
              <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                {mainNews.excerpt}
              </p>
              <div className="flex items-center text-gray-300 text-sm">
                <Clock size={14} className="mr-2 flex-shrink-0" />
                <span>{formatDate(mainNews.created_at)}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Важные новости */}
        <div className="grid grid-cols-1 gap-4">
          {importantNews.map((news) => (
            <Link to={`/news/${news.id}`} key={news.id} className="relative group cursor-pointer">
              <div className="flex gap-4">
                <div className="relative w-48 h-32 overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={news.image_url || news.image || 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <span 
                    className="inline-block text-white text-xs font-bold px-2 py-1 mb-2 rounded"
                    style={{ backgroundColor: news.category?.color || '#3B82F6' }}
                  >
                    {news.category?.name || 'NEWS'}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1 line-clamp-1">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={12} className="mr-1 flex-shrink-0" />
                    <span>{formatDate(news.created_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
