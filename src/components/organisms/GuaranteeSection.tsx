import React from 'react';
import { Zap } from 'lucide-react';

interface GuaranteeSectionProps {
  onNavigate: (page: string) => void;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onNavigate }) => (
  <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <Zap className="h-8 w-8 text-pink-600" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Garantia de Satisfação</h2>
      <p className="text-xl text-pink-100 mb-8">
        Se você não ficar satisfeito com os resultados nos primeiros 30 dias,
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
);
