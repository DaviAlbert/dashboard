import { api } from "@/lib/axios";

export interface GetProfileRespposne{
    name: string;
    id: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function GetProfile(){
    const response = await api.get<GetProfileRespposne>('/me')

    return response.data
}