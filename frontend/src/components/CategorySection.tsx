import { Clock, TrendingUp } from 'lucide-react';

export default function CategorySection() {
  const worldNews = [
    {
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "WORLD",
      title: "International Peace Talks Show Progress in Conflict Resolution",
      time: "3 hours ago"
    },
    {
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "POLITICS",
      title: "New Legislation Aims to Reform Healthcare System",
      time: "5 hours ago"
    },
    {
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "SCIENCE",
      title: "Breakthrough Discovery in Renewable Energy Storage",
      time: "7 hours ago"
    },
    {
      image: "https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "HEALTH",
      title: "New Study Reveals Benefits of Mediterranean Diet",
      time: "8 hours ago"
    }
  ];

  const trendingNews = [
    "Space Agency Announces Mars Mission Timeline",
    "Electric Vehicle Sales Surge Globally",
    "Major Tech Company Unveils New Innovation",
    "Historic Climate Agreement Signed",
    "Championship Winner Makes History"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border-b border-gray-800 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Latest Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {worldNews.map((news, index) => (
              <article key={index} className="group cursor-pointer">
                <div className="relative h-48 overflow-hidden mb-3">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">
                    {news.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {news.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={14} className="mr-2" />
                  <span>{news.time}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <TrendingUp className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-white">Trending Now</h2>
            </div>

            <div className="space-y-4">
              {trendingNews.map((news, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-800 last:border-b-0 cursor-pointer hover:opacity-70 transition-opacity">
                  <span className="text-red-500 font-bold text-lg">{index + 1}</span>
                  <p className="text-white text-sm font-medium leading-tight">{news}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news delivered to your inbox daily.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded mb-3 focus:outline-none focus:border-red-600"
            />
            <button className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
