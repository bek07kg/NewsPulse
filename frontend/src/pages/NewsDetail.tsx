import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { newsApi, NewsItem } from '../services/api';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data = await newsApi.getOne(Number(id));
        setNews(data);
        
        // Загружаем похожие новости (из той же категории)
        if (data.category) {
          const allNews = await newsApi.getAll();
          const sameCategory = allNews
            .filter(item => item.category.id === data.category.id && item.id !== data.id)
            .slice(0, 3);
          setRelatedNews(sameCategory);
        }
        
        setError(null);
      } catch (err) {
        setError('Макаланы жүктөөдө ката кетти');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = news?.title || 'News Pulse';

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Шилтеме көчүрүлдү!');
        return;
    }
    if (url) window.open(url, '_blank');
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 w-3/4 mb-4 rounded"></div>
            <div className="h-4 bg-gray-800 w-1/4 mb-8 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 w-full rounded"></div>
                  <div className="h-4 bg-gray-800 w-full rounded"></div>
                  <div className="h-4 bg-gray-800 w-3/4 rounded"></div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-800 h-48 rounded-lg"></div>
                <div className="bg-gray-800 h-24 mt-4 rounded-lg"></div>
                <div className="bg-gray-800 h-24 mt-4 rounded-lg"></div>
                <div className="bg-gray-800 h-24 mt-4 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Макала табылган жок'}</p>
          <Link 
            to="/"
            className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors inline-block"
          >
            Башкы бетке кайтуу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Верхняя навигация */}
      <div className="border-b border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Башкы бет
            </Link>
            <div className="flex items-center space-x-2 relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              >
                <Share2 size={20} />
              </button>
              
              {/* Меню поделиться */}
              {showShareMenu && (
                <div className="absolute top-12 right-0 bg-gray-900 rounded-lg border border-gray-800 shadow-xl p-2 z-50 min-w-[200px]">
                  <button onClick={() => handleShare('facebook')} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded transition-colors">
                    <Facebook size={18} className="text-blue-500" />
                    <span>Facebook</span>
                  </button>
                  <button onClick={() => handleShare('twitter')} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded transition-colors">
                    <Twitter size={18} className="text-sky-500" />
                    <span>Twitter</span>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded transition-colors">
                    <Linkedin size={18} className="text-blue-700" />
                    <span>LinkedIn</span>
                  </button>
                  <button onClick={() => handleShare('copy')} className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded transition-colors">
                    <LinkIcon size={18} className="text-gray-400" />
                    <span>Шилтеме көчүрүү</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок и мета информация */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4">
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{formatDate(news.created_at)}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-2" />
              <span>{news.views} көрүү</span>
            </div>
            <span 
              className="px-2 py-1 text-white text-xs font-bold rounded"
              style={{ backgroundColor: news.category?.color || '#DC2626' }}
            >
              {news.category?.name || 'ЖАҢЫЛЫК'}
            </span>
          </div>
        </div>

        {/* Основной контент: текст слева, изображение + похожие новости справа */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - текст */}
          <div className="lg:col-span-2">
            <div className="prose prose-invert max-w-none">
              {news.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Правая колонка */}
          <div className="lg:col-span-1 space-y-6">
            {/* Изображение */}
            {(news.image_url || news.image) && (
              <div className="rounded-lg overflow-hidden border border-gray-800">
                <img
                  src={news.image_url || news.image || ''}
                  alt={news.title}
                  className="w-full h-auto object-cover"
                />
                <p className="text-xs text-gray-500 py-2 text-center border-t border-gray-800">
                  Иллюстрациялык сүрөт
                </p>
              </div>
            )}

            {/* Виджет "Поделиться" */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <h3 className="text-sm font-bold mb-3 text-gray-400">Бөлүшүү</h3>
              <div className="flex space-x-2">
                <button onClick={() => handleShare('facebook')} className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  <Facebook size={16} className="mx-auto text-blue-500" />
                </button>
                <button onClick={() => handleShare('twitter')} className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  <Twitter size={16} className="mx-auto text-sky-500" />
                </button>
                <button onClick={() => handleShare('linkedin')} className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  <Linkedin size={16} className="mx-auto text-blue-700" />
                </button>
                <button onClick={() => handleShare('copy')} className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  <LinkIcon size={16} className="mx-auto text-gray-400" />
                </button>
              </div>
            </div>

            {/* Похожие новости - ТЕПЕРЬ ЗДЕСЬ! */}
            {relatedNews.length > 0 && (
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-white">Окшош жаңылыктар</h3>
                <div className="space-y-4">
                  {relatedNews.map((item) => (
                    <Link 
                      to={`/news/${item.id}`} 
                      key={item.id}
                      className="block group cursor-pointer"
                    >
                      <div className="flex gap-3">
                        {/* Маленькое изображение для похожей новости */}
                        <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                          <img
                            src={item.image_url || item.image || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium mb-1 group-hover:text-gray-300 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center text-gray-400 text-xs">
                            <Clock size={10} className="mr-1" />
                            <span>{formatDate(item.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Навигация по странице */}
        <div className="mt-12 pt-4 border-t border-gray-800 flex justify-between items-center text-sm text-gray-400">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors"
          >
            ↑ Башына чыгуу
          </button>
          <Link to="/" className="hover:text-white transition-colors">
            Башкы бетке →
          </Link>
        </div>
      </div>
    </div>
  );
}
