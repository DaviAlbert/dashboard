import { Helmet } from "react-helmet-async";
import { MonthOrdersAmountCard } from "./monthOrdersAmountCard";
import { MonthRevenueCard } from "./monthRevenueCard";
import { DayOrdersAmountCard } from "./dayOrdersAmountCard";
import { MonthCanceledOrdersAmountCard } from "./monthCanceledordersAmountCard";
import { RevenueChart } from "./revenuaChart";
import { PopularProductsChart } from "./popularProductsChart";

export function DashBoard(){
    return(
        <>
            <Helmet title='DashBoard'/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4">
                    <MonthRevenueCard/>
                    <MonthOrdersAmountCard/>
                    <DayOrdersAmountCard/>
                    <MonthCanceledOrdersAmountCard/>
                </div>
                <div className="grid grid-cols-9 gap-4 mt-[10px]">
                    <RevenueChart />
                    <PopularProductsChart/>
                </div>
            </div>
        </>
    ) 
}