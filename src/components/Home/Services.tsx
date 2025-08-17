import React from 'react';
import { Monitor, MapPin, Users, Clock } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: MapPin,
      title: "Personal Training Presencial",
      description: "Aulas individuais ou em pequenos grupos na região Sul",
      features: ["Acompanhamento em tempo real", "Equipamentos inclusos", "Avaliação física completa"],
      color: "pink",
      location: "Porto Alegre e região"
    },
    {
      icon: Monitor,
      title: "Consultoria Online",
      description: "Acompanhamento personalizado de qualquer lugar do mundo",
      features: ["Treinos personalizados", "Calls de acompanhamento", "Suporte via WhatsApp"],
      color: "blue",
      location: "Disponível mundialmente"
    },
    {
      icon: Users,
      title: "Treinos em Grupo",
      description: "Energia e motivação em aulas coletivas presenciais",
      features: ["Máximo 8 pessoas", "Ambiente motivador", "Preço mais acessível"],
      color: "green",
      location: "Porto Alegre"
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha a modalidade que melhor se adapta ao seu estilo de vida e objetivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Next Classes Preview */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Próximas Aulas</h3>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-pink-600 hover:text-pink-700 font-semibold"
            >
              Ver Agenda Completa →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Treino Funcional Feminino</h4>
                <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded">Presencial</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Hoje • 07:00 - 08:00
              </div>
              <p className="text-sm text-gray-500 mt-2">5/8 vagas ocupadas</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Consultoria Individual</h4>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Online</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Amanhã • 14:00 - 15:00
              </div>
              <p className="text-sm text-gray-500 mt-2">Disponível</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;