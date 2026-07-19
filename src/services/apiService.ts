import { ContactForm } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:9090/api';
const TRAINER_ID = import.meta.env.VITE_TRAINER_ID ?? '';

export interface PublicPresencialPlan {
    id: string;
    name: string;
    sessionsPerWeek: number;
    sessionsPerMonth: number;
    durationMinutes: number;
    price: number;
}

export interface PublicConsultoriaPlan {
    id: string;
    name: string;
    sessionsPerWeek: number;
    price: number;
}

export interface PublicPlans {
    presencial: PublicPresencialPlan[];
    consultoria: PublicConsultoriaPlan[];
}

export async function getPublicPlans(): Promise<PublicPlans> {
    if (!TRAINER_ID) return { presencial: [], consultoria: [] };

    const response = await fetch(`${API_URL}/plans/public/${TRAINER_ID}`);
    if (!response.ok) return { presencial: [], consultoria: [] };
    return response.json();
}

export async function submitLead(form: ContactForm): Promise<void> {
    const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            interest: form.interest,
            message: form.message,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const message =
            errorBody?.message ??
            `Erro ao enviar mensagem (${response.status}). Tente pelo WhatsApp.`;
        throw new Error(message);
    }
}
