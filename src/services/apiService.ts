import { ContactForm } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:9090/api';

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
