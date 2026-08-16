import React, { useState, useEffect } from 'react';
import { Check, MapPin } from 'lucide-react';
import { ContactForm as ContactFormData } from '../../types';
import { SelectedPlan } from '../../App';
import { submitLead } from '../../services/apiService';
import { ContactForm } from '../../components/organisms/ContactForm';
import { ContactInfoPanel } from '../../components/organisms/ContactInfoPanel';

interface ContactPageProps {
  selectedPlan?: SelectedPlan | null;
}

const buildPrefilledMessage = (plan: SelectedPlan) => {
  const typeLabel: Record<string, string> = { presencial: 'Presencial', online: 'Online', hibrido: 'Híbrido' };
  return `Olá, Viviana! 😊 Vi seu site e gostaria de saber mais sobre o plano *${plan.name}* (${typeLabel[plan.type] ?? plan.type} — R$ ${plan.price}/${plan.duration}). Pode me passar mais detalhes?`;
};

const ContactPage: React.FC<ContactPageProps> = ({ selectedPlan }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', phone: '',
    message: selectedPlan ? buildPrefilledMessage(selectedPlan) : '',
    interest: selectedPlan ? (selectedPlan.type === 'hibrido' ? 'ambos' : selectedPlan.type as ContactFormData['interest']) : 'ambos',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        message: buildPrefilledMessage(selectedPlan),
        interest: selectedPlan.type === 'hibrido' ? 'ambos' : selectedPlan.type as ContactFormData['interest'],
      }));
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitLead(formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', interest: 'ambos' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error: any) {
      setSubmitError(error?.message ?? 'Não foi possível enviar a mensagem. Tente pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vamos Conversar <span className="text-pink-600">Sobre Seus Objetivos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entre em contato para agendar uma conversa gratuita e descobrir como posso te ajudar a alcançar seus objetivos.
          </p>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="h-5 w-5 mr-2" />Mensagem enviada! Entrarei em contato em breve.
        </div>
      )}
      {submitError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center max-w-sm">
          <span className="mr-2">⚠️</span>{submitError}
        </div>
      )}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfoPanel />
            <ContactForm selectedPlan={selectedPlan} formData={formData} onFormChange={setFormData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Localização</h2>
            <p className="text-xl text-gray-600">Aulas presenciais na região Sul do Brasil</p>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Porto Alegre, RS</h3>
              <p className="text-gray-600">Atendimento presencial em academias e estúdios parceiros</p>
              <p className="text-gray-600">Entre em contato para mais detalhes sobre localização</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
