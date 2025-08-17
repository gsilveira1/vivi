import { ClassSchedule, Plan } from '../types';

export const mockClasses: ClassSchedule[] = [
  {
    id: '1',
    title: 'Treino Funcional Feminino',
    date: '2025-01-20',
    time: '07:00',
    duration: 60,
    instructor: 'Viviana Nath',
    maxParticipants: 8,
    currentParticipants: 5,
    description: 'Treino funcional focado em fortalecimento do core e membros inferiores',
    type: 'presencial'
  },
  {
    id: '2',
    title: 'Musculação - Membros Superiores',
    date: '2025-01-20',
    time: '18:00',
    duration: 45,
    instructor: 'Viviana Nath',
    maxParticipants: 6,
    currentParticipants: 3,
    description: 'Foco em fortalecimento de braços, ombros e costas',
    type: 'presencial'
  },
  {
    id: '3',
    title: 'Consultoria Online - Planejamento',
    date: '2025-01-21',
    time: '14:00',
    duration: 60,
    instructor: 'Viviana Nath',
    maxParticipants: 1,
    currentParticipants: 0,
    description: 'Sessão individual de planejamento e acompanhamento',
    type: 'online'
  },
  {
    id: '4',
    title: 'Treino HIIT',
    date: '2025-01-22',
    time: '06:30',
    duration: 30,
    instructor: 'Viviana Nath',
    maxParticipants: 10,
    currentParticipants: 8,
    description: 'Treino intervalado de alta intensidade',
    type: 'presencial'
  }
];

export const plans: Plan[] = [
  {
    id: '1',
    name: 'Consultoria Online',
    type: 'online',
    price: 297,
    originalPrice: 397,
    duration: 'Mensal',
    features: [
      'Treino personalizado semanal',
      'Acompanhamento nutricional básico',
      '2 calls de 30min por mês',
      'Suporte via WhatsApp',
      'Acesso a materiais exclusivos'
    ],
    description: 'Perfeito para mulheres que querem resultados de qualquer lugar do mundo'
  },
  {
    id: '2',
    name: 'Personal Presencial',
    type: 'presencial',
    price: 150,
    duration: 'Por Aula',
    features: [
      'Treino individual presencial',
      'Acompanhamento em tempo real',
      'Flexibilidade de horários',
      'Equipamentos inclusos',
      'Avaliação física completa'
    ],
    popular: true,
    description: 'Acompanhamento presencial personalizado na região Sul'
  },
  {
    id: '3',
    name: 'Plano Híbrido',
    type: 'hibrido',
    price: 697,
    originalPrice: 897,
    duration: 'Mensal',
    features: [
      '2 sessões presenciais por semana',
      'Treinos complementares online',
      'Acompanhamento nutricional completo',
      'Calls semanais de acompanhamento',
      'Suporte 24/7',
      'Acesso total aos materiais'
    ],
    description: 'A combinação perfeita entre presencial e online para resultados máximos'
  },
  {
    id: '4',
    name: 'Pacote 10 Aulas',
    type: 'presencial',
    price: 1200,
    originalPrice: 1500,
    duration: 'Válido por 3 meses',
    features: [
      '10 sessões presenciais',
      'Flexibilidade de agendamento',
      'Treinos variados',
      'Acompanhamento de evolução',
      'Validade estendida'
    ],
    description: 'Economia e flexibilidade para quem quer treinar presencial'
  }
];