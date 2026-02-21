import { Play } from 'lucide-react';

export default function VideoSection() {
  const videos = [
    {
      thumbnail: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Climate Summit: Key Takeaways",
      duration: "5:32"
    },
    {
      thumbnail: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Tech Innovation Showcase",
      duration: "4:15"
    },
    {
      thumbnail: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Economic Recovery Analysis",
      duration: "6:47"
    }
  ];

  return (
    <section className="bg-gray-900 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Video Reports</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group cursor-pointer">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Featured Video"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-red-600 rounded-full p-6 transition-transform duration-300 group-hover:scale-110">
                  <Play size={32} className="text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-white text-sm font-bold">
                8:24
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mt-4">
              Breaking: Special Report on Global Affairs
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              In-depth analysis of recent international developments and their impact
            </p>
          </div>

          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="flex gap-4 group cursor-pointer">
                <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                      <Play size={16} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-white text-xs font-bold">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Watch our latest video coverage
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
