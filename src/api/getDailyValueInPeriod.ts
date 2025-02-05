import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodQuery{
    from?: Date
    to?: Date
}

export type getDailyRevenueInPeriodResponse = {
    date: string
    receipt: number
}[]

export async function GetDailyRevenueInPeriod({from, to}:GetDailyRevenueInPeriodQuery){
    const response = await api.get<getDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period',{
        params:{
            from,
            to
        }
    })

    return response.data
}