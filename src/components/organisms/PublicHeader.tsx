import React, { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

interface PublicHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Início', id: 'home' },
    { name: 'Planos', id: 'plans' },
    { name: 'Contato', id: 'contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Viviana Nath</h1>
              <p className="text-xs text-gray-600">Personal Trainer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-700 hover:text-pink-600'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => onNavigate('plans')}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105"
            >
              Começar Agora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium transition-colors ${currentPage === item.id
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                    } rounded-lg`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('plans');
                  setIsMenuOpen(false);
                }}
                className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-medium text-center"
              >
                Começar Agora
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
