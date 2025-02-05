import { getDayOrdersAmount } from "@/api/getDayOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";

export function DayOrdersAmountCard(){
    const { data: dayOrdersAmount} = useQuery({
        queryKey: ['metrics', 'day-orders-amount'],
        queryFn: getDayOrdersAmount,

    })

    return(
        <Card className="p-[10px]">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
            {dayOrdersAmount ? (
                <>
                    <span className="text-2xl font-bold tracking-tight">{dayOrdersAmount.amount}</span>
                    <p className="text-xs text-muted-foreground">
                        {dayOrdersAmount.diffFromYesterday === 0 ? (
                        <>
                        <span className="text-chart-1 ml-[5px]">
                            {dayOrdersAmount.diffFromYesterday}%
                            {' '}
                        </span> 
                        em relação à ontem
                        </>
                        ) : dayOrdersAmount.diffFromYesterday > 0 ? (
                            <>
                                <span className="text-chart-2 ml-[5px]">
                                    +{dayOrdersAmount.diffFromYesterday}%
                                </span> 
                                em relação à ontem
                            </>
                        ) : (
                            <>
                                <span className="text-chart-5 ml-[5px]">
                                    {dayOrdersAmount.diffFromYesterday}%
                                </span> 
                                em relação à ontem
                            </>
                        )}
                    </p>
                    </>
            ):(<MetricCardSkeleton/>)}
        </CardContent>
    </Card>
    )
}