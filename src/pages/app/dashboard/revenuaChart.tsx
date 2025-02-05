import { GetDailyRevenueInPeriod } from "@/api/getDailyValueInPeriod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Label } from 'recharts'
import colors from 'tailwindcss/colors'
import { CardSkeleton } from "./cardSkeleton";

export function RevenueChart(){
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date()
    })

    const {data: dailyRevenueInPeriod} = useQuery({
        queryKey:['metrics', 'daily-revenue-in-period', dateRange],
        queryFn: () => GetDailyRevenueInPeriod({
            from: dateRange?.from,
            to : dateRange?.to
        })
    })

    const chartData = useMemo(() => {
        return dailyRevenueInPeriod?.map((chartItem) => {
          return {
            date: chartItem.date,
            receipt: chartItem.receipt / 100,
          }
        })
      }, [dailyRevenueInPeriod])

    return(
        <Card className="col-span-6 rounded-l-lg p-[5px]">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-bse font-medium">Receita no período</CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
                <div className="flex items-center-gap-3">
                    <Label>Período</Label>
                    <DateRangePicker date={dateRange} onDateChange={setDateRange}/>
                </div>
            </CardHeader>
            <CardContent>
                {chartData ? (
                    <ResponsiveContainer width='100%' height={240}>
                    <LineChart data={chartData} style={{fontSize: 12}}>
                        <XAxis dataKey='date' tickLine={false} axisLine={false} dy={16}/>
                        <YAxis stroke='#888' axisLine={false} tickFormatter={(value:number)=>value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}/>
                        <Line type='linear' strokeWidth={2} dataKey='receipt' stroke={colors.violet['500']}/>
                        <CartesianGrid vertical={false} className=""/>
                    </LineChart>
                </ResponsiveContainer>
                ):(<CardSkeleton/>)}
            </CardContent>
        </Card>
    )
}