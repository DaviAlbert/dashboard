import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MounthOrdersAmountCard(){
    return(
        <Card>
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            <span className="text-2xl font-bold tracking-tight">246</span>
            <p className="text-xs text-muted-foreground">
                <span className="text-chart-2 ml-[5px]">+6% </span> 
                em relação ao mês passado
            </p>
        </CardContent>
    </Card>
    )
}