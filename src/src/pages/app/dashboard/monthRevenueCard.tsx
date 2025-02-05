import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MounthRevenueCard(){
    return(
        <Card >
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            <span className="text-2xl font-bold tracking-tight">R$ 1248,60</span>
            <p className="text-xs text-muted-foreground">
                <span className="text-chart-2 dark:text-chart-2 ml-[5px]">+2% </span> 
                em relação ao mês passado
            </p>
        </CardContent>
    </Card>
    )
}