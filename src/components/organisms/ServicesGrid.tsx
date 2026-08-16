import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesGridProps {
  onNavigate: (page: string) => void;
}

const slides = [
  "DESCUBRA A MODALIDADE QUE MELHOR ATENDE ÀS SUAS NECESSIDADES, ESTILO DE VIDA E OBJETIVOS. SEJA QUAL FOR A SUA META",
  "EMAGRECER, GANHAR MASSA MUSCULAR, MELHORAR SUA SAÚDE, ALIVIAR O ESTRESSE OU SIMPLESMENTE MANTER-SE ATIVO",
  "OFERECEMOS DIVERSAS OPÇÕES PERSONALIZADAS PARA AJUDAR VOCÊ A ALCANÇAR SEUS RESULTADOS COM EFICIÊNCIA E SATISFAÇÃO. ESCOLHA O MÉTODO IDEAL E DÊ O PRÓXIMO PASSO RUMO AO SEU BEM-ESTAR!",
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const services = [
    {
      icon: MapPin,
      title: "Personal Training Presencial",
      description: "Aulas individuais",
      features: ["Treinos personalizados", "Avaliação física completa", "Suporte via WhatsApp"],
      color: "pink",
      location: "Taquara - RS"
    },
    {
      icon: Monitor,
      title: "Consultoria Online",
      description: "Acompanhamento personalizado de qualquer lugar do mundo",
      features: ["Treinos personalizados", "Calls de acompanhamento", "Suporte via WhatsApp"],
      color: "blue",
      location: "Online"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      pink: {
        bg: "bg-pink-50",
        icon: "bg-pink-100 text-pink-600",
        button: "bg-pink-600 hover:bg-pink-700",
        text: "text-pink-600"
      },
      blue: {
        bg: "bg-blue-50",
        icon: "bg-blue-100 text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
        text: "text-blue-600"
      },
      green: {
        bg: "bg-green-50",
        icon: "bg-green-100 text-green-600",
        button: "bg-green-600 hover:bg-green-700",
        text: "text-green-600"
      }
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Posso Te <span className="text-pink-600">Ajudar</span>
          </h2>

          {/* Slide Carousel */}
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-28 md:h-24 flex items-center justify-center overflow-hidden">
              {slides.map((text, index) => (
                <p
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center text-lg md:text-xl text-gray-600 px-10 transition-all duration-700 ease-in-out ${index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-pink-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            const Icon = service.icon;

            return (
              <div key={index} className={`${colors.bg} rounded-2xl p-8 hover:shadow-lg transition-all`}>
                <div className={`${colors.icon} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.location}
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 ${colors.text} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('plans')}
                  className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors`}
                >
                  Ver Planos
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
