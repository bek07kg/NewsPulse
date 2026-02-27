import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import NewsDetail from './pages/NewsDetail';
import { newsApi, categoryApi, HomepageData, Category } from './services/api';

// Главная страница
function HomePage({ 
  homepageData, 
  categories, 
  isLoading 
}: { 
  homepageData: HomepageData | null; 
  categories: Category[];
  isLoading: boolean;
}) {
  return (
    <>
      <Header categories={categories} />
      <Hero 
        mainNews={homepageData?.main}
        importantNews={homepageData?.important}
        isLoading={isLoading}
      />
      <CategorySection 
        categories={categories}
        newsByCategory={homepageData?.latest || []}
        isLoading={isLoading}
      />
      <VideoSection />
      <Footer />
    </>
  );
}

function App() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [homepage, cats] = await Promise.all([
          newsApi.getHomepage(),
          categoryApi.getAll()
        ]);
        
        setHomepageData(homepage);
        setCategories(cats);
        setError(null);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white"> {/* ← ВАЖНО: bg-black здесь */}
        <Routes>
          <Route path="/" element={
            <HomePage 
              homepageData={homepageData}
              categories={categories}
              isLoading={isLoading}
            />
          } />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
