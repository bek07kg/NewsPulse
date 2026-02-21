import { Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative group cursor-pointer">
          <div className="relative h-96 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Breaking News"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 mb-3">
              BREAKING NEWS
            </span>
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              Global Summit Addresses Climate Change Crisis
            </h2>
            <div className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-2" />
              <span>2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="relative group cursor-pointer">
            <div className="flex gap-4">
              <div className="relative w-48 h-32 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Technology News"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 mb-2">
                  TECHNOLOGY
                </span>
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  AI Revolution Transforms Healthcare Industry
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={12} className="mr-1" />
                  <span>4 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="flex gap-4">
              <div className="relative w-48 h-32 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Business News"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-1 mb-2">
                  BUSINESS
                </span>
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  Stock Markets Reach Record Highs Amid Economic Recovery
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={12} className="mr-1" />
                  <span>5 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="flex gap-4">
              <div className="relative w-48 h-32 overflow-hidden flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sports News"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <span className="inline-block bg-purple-600 text-white text-xs font-bold px-2 py-1 mb-2">
                  SPORTS
                </span>
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  Championship Finals Set for Historic Showdown
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={12} className="mr-1" />
                  <span>6 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
