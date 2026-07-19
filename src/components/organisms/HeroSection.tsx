import React from 'react';
import { Play, Star, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Personal Trainer Especializada
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transforme-se com o método{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">VIVI</span> de transformação
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Descubra o método exclusivo de Viviana Nath, que une
              ciência, personalização e motivação para resultados
              reais. Seja para emagrecer, ganhar músculos, melhorar
              sua saúde ou aumentar sua autoestima, o Método VIVI
              vai além do comum: ele é pensado para transformar não
              apenas seu corpo, mas sua mente e sua vida
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => onNavigate('plans')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Dê o primeiro passo rumo à sua melhor versão!
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Users className="h-6 w-6 text-pink-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">500+</span>
                </div>
                <p className="text-gray-600">Mulheres Transformadas</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Award className="h-6 w-6 text-pink-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">5+</span>
                </div>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Star className="h-6 w-6 text-pink-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-gray-600">Avaliação Média</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Viviana Nath Personal Trainer"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Certificada</p>
                  <p className="text-sm text-gray-600">CREF Ativo</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Online & Presencial</p>
                  <p className="text-sm text-gray-600">Flexibilidade Total</p>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl transform rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
