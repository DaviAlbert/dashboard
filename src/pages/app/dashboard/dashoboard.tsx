import { Helmet } from "react-helmet-async";
import { MounthOrdersAmountCard } from "./monthOrdersAmountCard";
import { MounthRevenueCard } from "./monthRevenueCard";
import { DayOrdersAmountCard } from "./dayOrdersAmountCard";
import { MounthCanceledOrdersAmountCard } from "./monthCanceledordersAmountCard";
import { RevenueChart } from "./revenuaChart";
import { PopularProductsChart } from "./popularProductsChart";

export function DashBoard(){
    return(
        <>
            <Helmet title='DashBoard'/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4">
                    <MounthRevenueCard/>
                    <MounthOrdersAmountCard/>
                    <DayOrdersAmountCard/>
                    <MounthCanceledOrdersAmountCard/>
                </div>
                <div className="grid grid-cols-9 gap-4 mt-[10px]">
                    <RevenueChart />
                    <PopularProductsChart/>
                </div>
            </div>
        </>
    ) 
}