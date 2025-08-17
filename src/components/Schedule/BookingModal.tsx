import React, { useState } from 'react';
import { X, Clock, Users, MapPin, Monitor, Check } from 'lucide-react';
import { ClassSchedule } from '../../types';

interface BookingModalProps {
  classItem: ClassSchedule | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: { name: string; email: string; phone: string }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ classItem, isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !classItem) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirm(formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  const isClassFull = classItem.currentParticipants >= classItem.maxParticipants;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isClassFull ? 'Lista de Espera' : 'Agendar Aula'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Class Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{classItem.title}</h3>
          <p className="text-gray-600 mb-4">{classItem.description}</p>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{new Date(classItem.date).toLocaleDateString('pt-BR')} às {classItem.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{classItem.currentParticipants}/{classItem.maxParticipants} participantes</span>
            </div>
            <div className="flex items-center text-gray-600">
              {classItem.type === 'presencial' ? (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Presencial - Porto Alegre</span>
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  <span>Online - Link será enviado</span>
                </>
              )}
            </div>
          </div>

          {isClassFull && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
              <p className="text-sm">
                Esta aula está lotada. Você pode entrar na lista de espera e será notificada
                caso haja desistências.
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {isClassFull ? 'Entrar na Lista' : 'Confirmar Agendamento'}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Terms */}
        <div className="px-6 pb-6">
          <p className="text-xs text-gray-500">
            Ao agendar, você concorda com nossos termos. Cancelamentos devem ser feitos com 
            {classItem.type === 'presencial' ? ' 4 horas' : ' 2 horas'} de antecedência.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;