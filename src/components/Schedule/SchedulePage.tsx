import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, Check } from 'lucide-react';
import Calendar from './Calendar';
import BookingModal from './BookingModal';
import { mockClasses } from '../../utils/mockData';
import { ClassSchedule } from '../../types';

const SchedulePage: React.FC = () => {
  const [classes, setClasses] = useState<ClassSchedule[]>(mockClasses);
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'presencial' | 'online'>('all');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredClasses = filter === 'all' 
    ? classes 
    : classes.filter(cls => cls.type === filter);

  const handleBookClass = (classId: string) => {
    const classItem = classes.find(cls => cls.id === classId);
    if (classItem) {
      setSelectedClass(classItem);
      setIsModalOpen(true);
    }
  };

  const handleConfirmBooking = (bookingData: { name: string; email: string; phone: string }) => {
    if (selectedClass) {
      // Update class participants
      setClasses(prev => prev.map(cls => 
        cls.id === selectedClass.id 
          ? { ...cls, currentParticipants: Math.min(cls.currentParticipants + 1, cls.maxParticipants) }
          : cls
      ));
      
      setIsModalOpen(false);
      setSelectedClass(null);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Agenda Online
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agende Sua <span className="text-pink-600">Aula</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o melhor horário para sua transformação. Aulas presenciais e online disponíveis.
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 flex space-x-1 shadow-sm">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'presencial', label: 'Presencial' },
                { key: 'online', label: 'Online' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as any)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === filterOption.key
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Agendamento confirmado! Você receberá um e-mail de confirmação.
        </div>
      )}

      {/* Calendar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Calendar 
            classes={filteredClasses} 
            onBookClass={handleBookClass}
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Política de Cancelamento</h3>
              <p className="text-gray-600 text-sm">
                Aulas presenciais: cancelamento até 4h antes<br />
                Consultorias online: cancelamento até 2h antes
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">O que levar</h3>
              <p className="text-gray-600 text-sm">
                Água, toalha e roupas confortáveis.<br />
                Equipamentos são fornecidos no local.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Dúvidas?</h3>
              <p className="text-gray-600 text-sm">
                Entre em contato via WhatsApp:<br />
                (51) 99999-9999
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        classItem={selectedClass}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default SchedulePage;