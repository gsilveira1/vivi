import React, { useState } from 'react';
import { Check, Star, Zap, Users, Monitor, MapPin } from 'lucide-react';
import { plans } from '../../utils/mockData';
import { SelectedPlan } from '../../App';

interface PlansPageProps {
  onNavigate: (page: string, plan?: SelectedPlan) => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'presencial' | 'online' | 'hibrido'>('all');

  const filteredPlans = selectedType === 'all'
    ? plans
    : plans.filter(plan => plan.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'presencial': return MapPin;
      case 'online': return Monitor;
      case 'hibrido': return Users;
      default: return Star;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'presencial': return 'text-pink-600 bg-pink-100';
      case 'online': return 'text-blue-600 bg-blue-100';
      case 'hibrido': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha Seu <span className="text-pink-600">Plano Ideal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Planos pensados especialmente para mulheres que querem resultados reais.
            Flexibilidade para se adaptar à sua rotina.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'Todos os Planos' },
              { key: 'presencial', label: 'Presencial' },
              { key: 'online', label: 'Online' },
              { key: 'hibrido', label: 'Híbrido' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedType(filter.key as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${selectedType === filter.key
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPlans.map((plan) => {
              const TypeIcon = getTypeIcon(plan.type);
              const typeColorClass = getTypeColor(plan.type);

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-pink-500 relative' : ''
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Mais Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${typeColorClass}`}>
                        <TypeIcon className="h-4 w-4 mr-1" />
                        {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center">
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-400 line-through mr-2">
                            R$ {plan.originalPrice}
                          </span>
                        )}
                        <span className="text-3xl font-bold text-gray-900">
                          R$ {plan.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{plan.duration}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => onNavigate('contact', {
                        name: plan.name,
                        type: plan.type,
                        price: plan.price,
                        duration: plan.duration,
                      })}
                      className={`w-full py-4 rounded-lg font-semibold transition-all ${plan.popular
                          ? 'bg-pink-600 text-white hover:bg-pink-700'
                          : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                        }`}
                    >
                      Escolher este Plano
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "Posso trocar de plano depois?",
                answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Entre em contato para fazer a alteração."
              },
              {
                question: "Como funciona o pagamento?",
                answer: "Aceitamos PIX para maior comodidade. O pagamento é feito mensalmente para planos recorrentes ou à vista para pacotes."
              },
              {
                question: "Preciso ter experiência prévia?",
                answer: "Não! Atendo desde iniciantes até atletas avançadas. Cada treino é adaptado ao seu nível atual."
              },
              {
                question: "E se eu não puder comparecer a uma aula?",
                answer: "Para aulas presenciais, você pode cancelar até 4 horas antes. Para consultorias online, até 2 horas antes."
              },
              {
                question: "O acompanhamento nutricional está incluído?",
                answer: "Sim! Todos os planos incluem orientações nutricionais básicas. Para acompanhamento mais detalhado, temos parcerias com nutricionistas."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-pink-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Garantia de Satisfação</h2>
          <p className="text-xl text-pink-100 mb-8">
            Se você não ficar satisfeita com os resultados nos primeiros 30 dias,
            devolvemos 100% do seu investimento.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
          >
            Quero Começar Agora →
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;