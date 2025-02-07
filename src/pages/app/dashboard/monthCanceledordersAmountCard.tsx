import { getMonthCanceledOrdersAmount } from "@/api/getMonthCanceledOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";

export function MonthCanceledOrdersAmountCard(){
    const { data: monthCanceledOrdersAmount} = useQuery({
        queryKey: ['metrics', 'month-canceled-orders-amount'],
        queryFn: getMonthCanceledOrdersAmount,

    })

    return(
        <Card className="p-[10px] rounded-r-lg">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
        {monthCanceledOrdersAmount ?(
                <>
                    <span className="text-2xl font-bold tracking-tight">{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}</span>
                    <p className="text-xs text-muted-foreground">
                        {monthCanceledOrdersAmount.diffFromLastMonth === 0 ? (
                            <>
                                <span className="text-chart-1 ml-[5px]">
                                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                                    {' '}
                                </span> 
                                em relação ao mês passado.
                            </>
                        ) : monthCanceledOrdersAmount.diffFromLastMonth > 0 ? (
                            <>
                                <span className="text-chart-5 ml-[5px]">
                                    +{monthCanceledOrdersAmount.diffFromLastMonth}%
                                    {' '}
                                </span> 
                                em relação ao mês passado.
                            </>
                        ) : (
                            <>
                                <span className="text-chart-2 ml-[5px]">
                                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                                    {' '}
                                </span> 
                                em relação ao mês passado.
                            </>
                        )}
                    </p>
                    </>
            ):(<MetricCardSkeleton/>)}
        </CardContent>
    </Card>
    )
}