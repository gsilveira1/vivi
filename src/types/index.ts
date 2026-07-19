export interface ClassSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  type: 'presencial' | 'online';
}

export interface Plan {
  id: string;
  name: string;
  type: 'presencial' | 'online' | 'hibrido';
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  popular?: boolean;
  description: string;
}

export interface Booking {
  id: string;
  classId: string;
  userEmail: string;
  userName: string;
  status: 'confirmed' | 'waiting' | 'cancelled';
  bookedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  interest: 'presencial' | 'online' | 'ambos';
}

/** Shape returned by GET /api/sessions/available */
export interface AvailableSlot {
  date: string;   // 'YYYY-MM-DD'
  time: string;   // 'HH:MM'
  type: 'In-Person' | 'Online';
  available: boolean;
}