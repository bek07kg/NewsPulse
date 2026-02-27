import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';
import { Category, NewsItem } from '../services/api';

interface CategorySectionProps {
  categories: Category[];
  newsByCategory: NewsItem[];
  isLoading: boolean;
}

export default function CategorySection({ 
//   categories, 
  newsByCategory, 
  isLoading 
}: CategorySectionProps) {
  
  const [trendingNews, setTrendingNews] = useState<string[]>([]);

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Только что';
    if (diffHours < 24) return `${diffHours} часа назад`;
    return date.toLocaleDateString('ru-RU');
  };

  // Генерируем trending из последних новостей
  useEffect(() => {
    if (newsByCategory.length > 0) {
      const trending = newsByCategory.slice(0, 5).map(news => news.title);
      setTrendingNews(trending);
    } else {
      setTrendingNews([
        "Космос агенттиги Марска миссия жарыялады",
        "Электр унааларынын сатылышы дүйнө жүзүндө өстү",
        "Технологиялык гигант жаңы инновацияны тааныштырды",
        "Тарыхый климаттык келишимге кол коюлду",
        "Чемпионаттын жеңүүчүсү тарых жаратты"
      ]);
    }
  }, [newsByCategory]);

  // Состояние загрузки
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-8 bg-gray-800 w-48 mb-6 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="bg-gray-800 h-48 rounded-lg"></div>
                    <div className="bg-gray-800 h-6 w-full rounded"></div>
                    <div className="bg-gray-800 h-4 w-24 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 h-96 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка с новостями */}
        <div className="lg:col-span-2">
          <div className="border-b border-gray-800 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Последние новости
            </h2>
          </div>

          {newsByCategory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Новостей нету</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsByCategory.slice(0, 4).map((news) => (
                <Link to={`/news/${news.id}`} key={news.id} className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg mb-3">
                    <img
                      src={news.image_url || news.image || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span 
                      className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded"
                      style={{ backgroundColor: news.category?.color || '#DC2626' }}
                    >
                      {news.category?.name || 'НОВОСТИ'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={14} className="mr-2 flex-shrink-0" />
                    <span>{formatDate(news.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Правая колонка */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 sticky top-28">
            <div className="flex items-center mb-6">
              <TrendingUp className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-white">В тренде</h2>
            </div>

            <div className="space-y-4">
              {trendingNews.map((news, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-3 pb-4 border-b border-gray-800 last:border-b-0 cursor-pointer hover:opacity-70 transition-opacity group"
                >
                  <span className="text-red-500 font-bold text-lg min-w-[24px]">
                    {index + 1}
                  </span>
                  <p className="text-white text-sm font-medium leading-tight group-hover:text-gray-300 transition-colors">
                    {news}
                  </p>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-bold text-white mb-4">
                Подписаться на новостей
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Чтобы получать новых новостей пишите электронную почту.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email почта"
                  className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-red-600 transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
