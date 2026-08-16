import React from 'react';
import { MapPin, Monitor, Loader2, Star } from 'lucide-react';
import { type PublicPlans } from '../../services/apiService';
import { SelectedPlan } from '../../App';
import { PlanFeatureItem } from '../molecules/PlanFeatureItem';

interface PlanCardGridProps {
  plans: PublicPlans;
  activeTab: 'presencial' | 'consultoria';
  loading: boolean;
  onSelectPlan: (plan: SelectedPlan) => void;
}

export const PlanCardGrid: React.FC<PlanCardGridProps> = ({ plans, activeTab, loading, onSelectPlan }) => {
  const hasPresencial = plans.presencial.length > 0;
  const hasConsultoria = plans.consultoria.length > 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (!hasPresencial && !hasConsultoria) {
    return (
      <div className="text-center py-24 text-gray-400">
        <Star className="h-16 w-16 mx-auto mb-4 opacity-30" />
        <p className="text-lg">Em breve novos planos disponíveis.</p>
      </div>
    );
  }

  return (
    <>
      {activeTab === 'presencial' && hasPresencial && (
        <div>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" /> Treino Presencial
            </span>
            <p className="text-gray-600">Treine ao vivo, com acompanhamento presencial personalizado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.presencial.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 text-pink-600 bg-pink-100">
                      <MapPin className="h-4 w-4 mr-1" />Presencial
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  </div>
                  <ul className="space-y-3 mb-6 text-sm text-gray-700">
                    <PlanFeatureItem><strong>{plan.sessionsPerWeek}x</strong>&nbsp;por semana</PlanFeatureItem>
                    <PlanFeatureItem><strong>{plan.sessionsPerMonth}</strong>&nbsp;sessões/mês</PlanFeatureItem>
                    <PlanFeatureItem><strong>{plan.durationMinutes}</strong>&nbsp;min por sessão</PlanFeatureItem>
                  </ul>
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
                    <p className="text-gray-500 text-sm mt-1">por mês</p>
                  </div>
                  <button
                    onClick={() => onSelectPlan({ name: plan.name, type: 'presencial', price: plan.price, duration: 'mensal' })}
                    className="w-full py-4 rounded-lg font-semibold bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all"
                  >
                    Escolher este Plano
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'consultoria' && hasConsultoria && (
        <div>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <Monitor className="h-4 w-4" /> Consultoria Online
            </span>
            <p className="text-gray-600">Acompanhamento online com check-ins regulares e treino adaptado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.consultoria.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 text-blue-600 bg-blue-100">
                      <Monitor className="h-4 w-4 mr-1" />Online
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  </div>
                  <ul className="space-y-3 mb-6 text-sm text-gray-700">
                    <PlanFeatureItem color="blue"><strong>{plan.sessionsPerWeek}</strong>&nbsp;check-in{plan.sessionsPerWeek > 1 ? 's' : ''}/semana</PlanFeatureItem>
                    <PlanFeatureItem color="blue">Treino personalizado online</PlanFeatureItem>
                    <PlanFeatureItem color="blue">Acompanhamento via app</PlanFeatureItem>
                  </ul>
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
                    <p className="text-gray-500 text-sm mt-1">por mês</p>
                  </div>
                  <button
                    onClick={() => onSelectPlan({ name: plan.name, type: 'online', price: plan.price, duration: 'mensal' })}
                    className="w-full py-4 rounded-lg font-semibold bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
                  >
                    Escolher este Plano
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
