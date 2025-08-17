import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, MapPin, Monitor } from 'lucide-react';
import { ClassSchedule } from '../../types';

interface CalendarProps {
  classes: ClassSchedule[];
  onBookClass: (classId: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ classes, onBookClass }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'day'>('week');

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getClassesForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return classes.filter(cls => cls.date === dateStr);
  };

  const weekDays = getWeekDays(currentDate);
  const todayClasses = getClassesForDate(currentDate);

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Agenda de Aulas</h2>
          <div className="flex bg-white bg-opacity-20 rounded-lg p-1">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-white text-pink-600' : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'day' ? 'bg-white text-pink-600' : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              Dia
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => view === 'week' ? navigateWeek('prev') : navigateDay('prev')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-xl font-semibold">
            {view === 'week' 
              ? `${weekDays[0].getDate()} - ${weekDays[6].getDate()} de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              : `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
            }
          </h3>
          <button
            onClick={() => view === 'week' ? navigateWeek('next') : navigateDay('next')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-6">
        {view === 'week' ? (
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const dayClasses = getClassesForDate(day);
              const isToday = formatDate(day) === formatDate(new Date());
              
              return (
                <div key={index} className="min-h-[200px]">
                  <div className={`text-center p-2 rounded-lg mb-2 ${
                    isToday ? 'bg-pink-100 text-pink-600' : 'text-gray-600'
                  }`}>
                    <div className="text-sm font-medium">{dayNames[index]}</div>
                    <div className="text-lg font-bold">{day.getDate()}</div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className={`p-2 rounded-lg text-xs cursor-pointer hover:shadow-md transition-all ${
                          cls.type === 'presencial' 
                            ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' 
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                        onClick={() => onBookClass(cls.id)}
                      >
                        <div className="font-medium truncate">{cls.title}</div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {cls.time}
                        </div>
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          {cls.currentParticipants}/{cls.maxParticipants}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {todayClasses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">Nenhuma aula agendada para este dia</div>
              </div>
            ) : (
              todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{cls.title}</h3>
                      <p className="text-gray-600">{cls.description}</p>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      cls.type === 'presencial' 
                        ? 'bg-pink-100 text-pink-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {cls.type === 'presencial' ? <MapPin className="h-4 w-4 mr-1" /> : <Monitor className="h-4 w-4 mr-1" />}
                      {cls.type === 'presencial' ? 'Presencial' : 'Online'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{cls.time} ({cls.duration}min)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{cls.currentParticipants}/{cls.maxParticipants} vagas</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Instrutor:</span> {cls.instructor}
                    </div>
                    <div className={`font-medium ${
                      cls.currentParticipants >= cls.maxParticipants ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {cls.currentParticipants >= cls.maxParticipants ? 'Lotada' : 'Disponível'}
                    </div>
                  </div>

                  <button
                    onClick={() => onBookClass(cls.id)}
                    disabled={cls.currentParticipants >= cls.maxParticipants}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      cls.currentParticipants >= cls.maxParticipants
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                  >
                    {cls.currentParticipants >= cls.maxParticipants ? 'Entrar na Lista de Espera' : 'Agendar Aula'}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;