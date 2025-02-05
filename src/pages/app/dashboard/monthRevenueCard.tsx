import { getMonthRevenue } from "@/api/getMonthRevenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";

export function MonthRevenueCard(){
    const { data: monthRevenue} = useQuery({
        queryKey: ['metrics', 'month-revenue'],
        queryFn: getMonthRevenue,

    })

    return(
        <Card className="p-[10px] rounded-l-lg">
        <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
        {monthRevenue?(
                <>
                    <span className="text-2xl font-bold tracking-tight">              
                        {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}</span>
                    <p className="text-xs text-muted-foreground">
                        {monthRevenue.diffFromLastMonth === 0 ? (
                            <>
                                <span className="text-chart-1 ml-[5px]">
                                    {monthRevenue.diffFromLastMonth}%
                                    {' '}
                                </span> 
                                em relação ao mês passado.
                            </>
                        ) : monthRevenue.diffFromLastMonth > 0 ? (
                            <>
                                <span className="text-chart-2 ml-[5px]">
                                    +{monthRevenue.diffFromLastMonth}%
                                    {' '}
                                </span> 
                                em relação ao mês passado.
                            </>
                        ) : (
                            <>
                                <span className="text-chart-5 ml-[5px]">
                                    {monthRevenue.diffFromLastMonth}%
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