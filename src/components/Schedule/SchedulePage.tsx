import React, { useState, useEffect, useCallback } from 'react';
import { BookingCalendar } from '../organisms/BookingCalendar';
import { BookingModal } from '../organisms/BookingModal';
import { AvailableSlot } from '../../types';
import { fetchAvailableSlots } from '../../utils/apiService';
import { addMonths, startOfMonth, endOfMonth } from 'date-fns';

export const SchedulePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSlots = useCallback(async (month: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const start = startOfMonth(month);
      const end = endOfMonth(month);
      const slots = await fetchAvailableSlots(start, end);
      setAvailableSlots(slots);
    } catch (err) {
      console.error('Failed to load available slots:', err);
      setError('Não foi possível carregar os horários. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadSlots(currentMonth); }, [currentMonth, loadSlots]);

  const handleSlotSelect = (slot: AvailableSlot) => { setSelectedSlot(slot); setIsBookingModalOpen(true); };
  const handleBookingSuccess = () => { setIsBookingModalOpen(false); setSelectedSlot(null); loadSlots(currentMonth); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4 border border-purple-500/30">Agenda</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Horários Disponíveis</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">Escolha o melhor horário e dê o primeiro passo na sua transformação. Vagas limitadas.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm text-center">
            {error}
            <button onClick={() => loadSlots(currentMonth)} className="ml-3 underline hover:no-underline">Tentar novamente</button>
          </div>
        )}

        <BookingCalendar
          currentMonth={currentMonth}
          availableSlots={availableSlots}
          isLoading={isLoading}
          onPrevMonth={() => setCurrentMonth((m) => addMonths(m, -1))}
          onNextMonth={() => setCurrentMonth((m) => addMonths(m, 1))}
          onSlotSelect={handleSlotSelect}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📍', title: 'Presencial', desc: 'Região Sul – Pelotas/RS' },
            { icon: '💻', title: 'Online', desc: 'Atendimento via videochamada' },
            { icon: '🎯', title: 'Personalizado', desc: 'Treinos 100% individualizados' },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-white font-semibold text-sm">{item.title}</div>
              <div className="text-gray-400 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {isBookingModalOpen && selectedSlot && (
        <BookingModal slot={selectedSlot} onClose={() => setIsBookingModalOpen(false)} onSuccess={handleBookingSuccess} />
      )}
    </div>
  );
};
export default SchedulePage;
