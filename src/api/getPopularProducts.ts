import { api } from "@/lib/axios";

export type getPopularProductsAmountResponse = {
    product: string
    amount: number
}[]

export async function getPopularProducts(){
    const response = await api.get<getPopularProductsAmountResponse>('/metrics/popular-products')

    return response.data
}