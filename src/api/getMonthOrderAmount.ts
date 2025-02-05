import { api } from "@/lib/axios";

export interface getmonthOrdersAmountResponse{
    amount:number
    diffFromLastMonth: number
}

export async function getmonthOrdersAmount(){
    const response = await api.get<getmonthOrdersAmountResponse>('/metrics/month-orders-amount')

    return response.data
}