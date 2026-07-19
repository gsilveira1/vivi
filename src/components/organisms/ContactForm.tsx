import React from 'react';
import { Send, Star } from 'lucide-react';
import { ContactForm as ContactFormData } from '../../types';
import { SelectedPlan } from '../../App';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';

const typeLabel: Record<string, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Híbrido',
};

interface ContactFormProps {
  selectedPlan?: SelectedPlan | null;
  formData: ContactFormData;
  onFormChange: (data: ContactFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedPlan,
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h3>

      {/* Selected Plan Banner */}
      {selectedPlan && (
        <div className="mb-6 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-pink-500 text-white p-2 rounded-full mt-0.5 flex-shrink-0">
            <Star className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-pink-700 text-sm">Plano selecionado</p>
            <p className="text-pink-900 font-bold">{selectedPlan.name}</p>
            <p className="text-pink-700 text-sm">
              {typeLabel[selectedPlan.type]} &middot; R$ {selectedPlan.price} / {selectedPlan.duration}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <FormField label="Nome Completo" htmlFor="name" required>
          <Input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="E-mail" htmlFor="email" required>
            <Input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
              placeholder="seu@email.com"
            />
          </FormField>

          <FormField label="WhatsApp" htmlFor="phone" required>
            <Input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
            />
          </FormField>
        </div>

        <FormField label="Interesse" htmlFor="interest" required>
          <select
            id="interest"
            required
            value={formData.interest}
            onChange={(e) => onFormChange({ ...formData, interest: e.target.value as ContactFormData['interest'] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="presencial">Aulas Presenciais</option>
            <option value="online">Consultoria Online</option>
            <option value="ambos">Ambos</option>
          </select>
        </FormField>

        <FormField label="Mensagem" htmlFor="message" required>
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => onFormChange({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Conte-me sobre seus objetivos e como posso te ajudar..."
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Enviar Mensagem
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Respondo todas as mensagens em até 24 horas. Para urgências, use o WhatsApp.
      </p>
    </div>
  );
};
