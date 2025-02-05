import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton(){
    return(
        <>
            <Skeleton className="h-[8px] w-[17px] bg-muted-foreground mt-[5px]"/>
            <Skeleton className="h-[18px] w-[200px] mt-[25px]"/>
        </>
    )
}