import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <CategorySection />
      <VideoSection />
      <Footer />
    </div>
  );
}

export default App;
