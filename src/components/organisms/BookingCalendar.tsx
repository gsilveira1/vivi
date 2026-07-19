import React, { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isPast, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';
import { AvailableSlot } from '../../types';

interface BookingCalendarProps {
  currentMonth: Date;
  availableSlots: AvailableSlot[];
  isLoading: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSlotSelect: (slot: AvailableSlot) => void;
}

const WEEKDAY_HEADERS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  currentMonth,
  availableSlots,
  isLoading,
  onPrevMonth,
  onNextMonth,
  onSlotSelect,
}) => {
  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Map: 'YYYY-MM-DD' → AvailableSlot[]
  const slotsByDate = useMemo(() => {
    const map: Record<string, AvailableSlot[]> = {};
    for (const slot of availableSlots) {
      if (!map[slot.date]) map[slot.date] = [];
      map[slot.date].push(slot);
    }
    return map;
  }, [availableSlots]);

  // Determine the leading empty cells (Mon=0, Sun=6)
  const leadingBlanks = useMemo(() => {
    // getDay returns 0=Sun…6=Sat, we want Mon-first (1=Mon → 0 blanks, 0=Sun → 6 blanks)
    const dow = getDay(startOfMonth(currentMonth));
    return dow === 0 ? 6 : dow - 1;
  }, [currentMonth]);

  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleDayClick = (dateKey: string) => {
    const slots = slotsByDate[dateKey];
    if (!slots || slots.length === 0) return;
    setSelectedDate(dateKey === selectedDate ? null : dateKey);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white font-semibold text-lg capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-white/10">
        {WEEKDAY_HEADERS.map((h) => (
          <div key={h} className="py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wide">
            {h}
          </div>
        ))}
      </div>

      {/* Day grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <span className="ml-3 text-gray-400">Carregando horários...</span>
        </div>
      ) : (
        <div className="grid grid-cols-7">
          {/* Leading blank cells */}
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} className="h-16 border-b border-r border-white/5" />
          ))}

          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const slots = slotsByDate[dateKey] ?? [];
            const hasSlots = slots.length > 0;
            const isPastDay = isPast(startOfDay(day)) && !isToday(day);
            const isSelected = selectedDate === dateKey;
            const isCurrentDay = isToday(day);

            return (
              <div
                key={dateKey}
                onClick={() => handleDayClick(dateKey)}
                className={`relative h-16 border-b border-r border-white/5 transition-all select-none
                  ${hasSlots && !isPastDay ? 'cursor-pointer hover:bg-purple-500/10' : 'opacity-40'}
                  ${isSelected ? 'bg-purple-500/20 ring-1 ring-purple-400/50 ring-inset' : ''}
                  ${isCurrentDay ? 'bg-white/5' : ''}
                `}
              >
                <span
                  className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium
                    ${isCurrentDay ? 'bg-purple-500 text-white' : 'text-gray-300'}
                  `}
                >
                  {format(day, 'd')}
                </span>
                {hasSlots && !isPastDay && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <span className="flex gap-0.5">
                      {Math.min(slots.length, 3) > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-80" />
                      )}
                      {slots.length > 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60" />
                      )}
                      {slots.length > 2 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-40" />
                      )}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Slot picker -- shown when a date is selected */}
      {selectedDate && slotsByDate[selectedDate] && (
        <div className="border-t border-white/10 p-4 animate-in slide-in-from-bottom-2 duration-200">
          <p className="text-sm text-gray-400 mb-3 font-medium">
            Horários disponíveis em {format(parseISO(selectedDate), "dd 'de' MMMM", { locale: ptBR })}:
          </p>
          <div className="flex flex-wrap gap-2">
            {slotsByDate[selectedDate]
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((slot) => (
                <button
                  key={`${slot.date}-${slot.time}`}
                  onClick={() => onSlotSelect(slot)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/40 hover:border-purple-400 rounded-lg text-purple-200 hover:text-white text-sm font-medium transition-all"
                >
                  <Clock className="w-3.5 h-3.5" />
                  {slot.time}
                  <span className="text-xs opacity-60 ml-1">
                    {slot.type === 'Online' ? '\uD83D\uDCBB' : '\uD83D\uDCCD'}
                  </span>
                </button>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Clique em um horário para iniciar o processo de agendamento.
          </p>
        </div>
      )}
    </div>
  );
};
