import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard(){
    return(
        <Card >
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            <span className="text-2xl font-bold tracking-tight">12</span>
            <p className="text-xs text-muted-foreground">
                <span className="text-chart-5 ml-[5px]">-4% </span> 
                em relação ao mês passado
            </p>
        </CardContent>
    </Card>
    )
}