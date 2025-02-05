import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton(){
    return(
        <>
            <Skeleton className="h-[240px] w-[630px] bg-muted-foreground mt-[5px] opacity-[0.2]"/>
        </>
    )
}