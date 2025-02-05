import { api } from "@/lib/axios";

export interface cancelDetailsParams{
    orderId: string
}

export async function CancelOrder({orderId}:cancelDetailsParams){
    await api.patch(`/orders/${orderId}/cancel`)
}