import React, { useState, useEffect } from 'react';
import { MapPin, Monitor } from 'lucide-react';
import { getPublicPlans, type PublicPlans } from '../../services/apiService';
import { SelectedPlan } from '../../App';
import { PlanCardGrid } from '../../components/organisms/PlanCardGrid';
import { FAQSection } from '../../components/organisms/FAQSection';
import { GuaranteeSection } from '../../components/organisms/GuaranteeSection';

interface PlansPageProps {
  onNavigate: (page: string, plan?: SelectedPlan) => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onNavigate }) => {
  const [plans, setPlans] = useState<PublicPlans>({ presencial: [], consultoria: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'presencial' | 'consultoria'>('presencial');

  useEffect(() => {
    getPublicPlans().then(setPlans).finally(() => setLoading(false));
  }, []);

  const hasPresencial = plans.presencial.length > 0;
  const hasConsultoria = plans.consultoria.length > 0;

  const handleSelectPlan = (plan: SelectedPlan) => onNavigate('contact', plan);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha Seu <span className="text-pink-600">Plano Ideal</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Planos pensados especialmente para quem quer resultados reais. Flexibilidade para se adaptar à sua rotina.
          </p>
          {!loading && (hasPresencial || hasConsultoria) && (
            <div className="flex justify-center gap-4">
              {hasPresencial && (
                <button onClick={() => setActiveTab('presencial')} className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all ${activeTab === 'presencial' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'}`}>
                  <MapPin className="h-4 w-4" />Presencial
                </button>
              )}
              {hasConsultoria && (
                <button onClick={() => setActiveTab('consultoria')} className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all ${activeTab === 'consultoria' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'}`}>
                  <Monitor className="h-4 w-4" />Consultoria Online
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlanCardGrid plans={plans} activeTab={activeTab} loading={loading} onSelectPlan={handleSelectPlan} />
        </div>
      </section>

      <FAQSection />
      <GuaranteeSection onNavigate={onNavigate} />
    </div>
  );
};

export default PlansPage;
