import { Menu, Search, User } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { Category } from '../services/api';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  // Если категории из API пустые, показываем стандартные
  const displayCategories = categories.length > 0 
    ? categories.map(cat => cat.name)
    : ['Главная', 'Мировой', 'Политика', 'Бизнес', 'Технология', 'Наука', 'Медицина', 'Интересные', 'Спорт'];

  return (
    <>
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
              {displayCategories.map((category) => (
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

      {/* Бегущая строка */}
      <div className="bg-red-600 h-[20px] flex items-center">
        <Marquee speed={50} gradient={false}>
          {[...Array(12)].map((_, i) => (
            <img 
              key={i}
              src="/images/newslogonew.png" 
              alt="NewsPulse" 
              className="h-16 mx-12" 
            />
          ))}
        </Marquee>
      </div>
    </>
  );
}
