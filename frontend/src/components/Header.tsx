import { Menu, Search, User } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { Category } from '../services/api';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const activeClass = "text-sm font-medium text-orange-500 transition-colors";
  const inactiveClass = "text-sm font-medium text-white hover:text-gray-300 transition-colors";

  return (
    <>
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-8">
              <button className="lg:hidden text-white hover:text-gray-300">
                <Menu size={24} />
              </button>
              <Link to="/">
                <img src="/images/newslogonew.png" alt="NewsPulse" className="h-36 w-auto" />
              </Link>
            </div>

            <nav className="hidden lg:flex space-x-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                Главная
              </NavLink>
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className={({ isActive }) => isActive ? activeClass : inactiveClass}
                >
                  {category.name}
                </NavLink>
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
