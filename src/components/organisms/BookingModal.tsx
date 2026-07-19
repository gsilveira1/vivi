import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X, Clock, MapPin, Monitor, Check, Loader2 } from 'lucide-react';
import { AvailableSlot } from '../../types';
import { submitLeadForm } from '../../utils/apiService';

interface BookingModalProps {
  slot: AvailableSlot;
  onClose: () => void;
  onSuccess: () => void;
}

type ModalStep = 'form' | 'success';

export const BookingModal: React.FC<BookingModalProps> = ({ slot, onClose, onSuccess }) => {
  const [step, setStep] = useState<ModalStep>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const formattedDate = format(parseISO(slot.date), "EEEE, dd 'de' MMMM", { locale: ptBR });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const ok = await submitLeadForm({
      ...formData,
      interest: slot.type === 'Online' ? 'online' : 'presencial',
      preferredSlotDate: slot.date,
      preferredSlotTime: slot.time,
    });

    setIsSubmitting(false);

    if (ok) {
      setStep('success');
    } else {
      setSubmitError('Não conseguimos enviar seu kontato. Tente novamente ou fale via WhatsApp.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">
            {step === 'success' ? '\uD83C\uDF89 Pedido Enviado!' : 'Quero esse horário'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          /* --- Success state --- */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Recebemos seu contato!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Entraremos em contato em até 24h para confirmar o agendamento de{' '}
              <span className="text-purple-300 font-medium">{formattedDate} às {slot.time}</span>.
            </p>
            <button
              onClick={onSuccess}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          /* --- Form state --- */
          <>
            {/* Slot summary */}
            <div className="p-5 border-b border-white/10 bg-purple-500/10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="capitalize">{formattedDate} às <strong className="text-white">{slot.time}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  {slot.type === 'Online' ? (
                    <><Monitor className="w-4 h-4 text-blue-400" /><span>Sessão Online (link por e-mail)</span></>
                  ) : (
                    <><MapPin className="w-4 h-4 text-orange-400" /><span>Presencial – Pelotas/RS</span></>
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-sm text-gray-400">
                Preencha seus dados e entraremos em contato para confirmar o horário.
              </p>

              <div>
                <label htmlFor="bm-name" className="block text-xs font-medium text-gray-400 mb-1.5">Nome completo *</label>
                <input
                  id="bm-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition"
                />
              </div>

              <div>
                <label htmlFor="bm-email" className="block text-xs font-medium text-gray-400 mb-1.5">E-mail *</label>
                <input
                  id="bm-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition"
                />
              </div>

              <div>
                <label htmlFor="bm-phone" className="block text-xs font-medium text-gray-400 mb-1.5">WhatsApp *</label>
                <input
                  id="bm-phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(53) 99999-9999"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition"
                />
              </div>

              <div>
                <label htmlFor="bm-message" className="block text-xs font-medium text-gray-400 mb-1.5">Mensagem (opcional)</label>
                <textarea
                  id="bm-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre seus objetivos..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition resize-none"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {submitError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-medium hover:bg-white/5 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                  ) : (
                    <><Check className="w-4 h-4" /> Quero esse horário</>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
