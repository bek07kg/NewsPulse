import { Menu, Search, User } from 'lucide-react';

export default function Header() {
  const categories = ['Башкы бет', 'Дүйнөлүк', 'Саясат', 'Бизнес', 'Технология', 'Илим', 'Медицина', 'Кызыктуу'];

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-8">
            <button className="lg:hidden text-white hover:text-gray-300">
              <Menu size={24} />
            </button>
            <img src="/images/newslogonew.png" alt="NewsPulse" className="h-36 w-auto" />
          </div>

          <nav className="hidden lg:flex space-x-6">
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
              >
                {category}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <Search size={20} />
            </button>
            <button className="text-white hover:text-gray-300">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
