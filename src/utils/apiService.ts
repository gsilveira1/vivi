import { AvailableSlot } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:9090/api'

export async function fetchAvailableSlots(start: Date, end: Date): Promise<AvailableSlot[]> {
    const url = `${BASE_URL}/sessions/available?start=${start.toISOString().split('T')[0]}&end=${end.toISOString().split('T')[0]}`
    const res = await fetch(url)
    if (!res.ok) return []
    return res.json()
}

export async function submitLeadForm(data: {
    name: string
    email: string
    phone: string
    message: string
    interest: string
    preferredSlotDate?: string
    preferredSlotTime?: string
}) {
    const res = await fetch(`${BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return res.ok
}
