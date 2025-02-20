import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger  } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./orderDetails";
import { OrderStatus } from "@/components/orderStatus";
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {CancelOrder} from '@/api/cancelOrder'
import { queryClient } from "@/lib/reactQuery";
import { GetOrdersResponse } from "@/api/getOrders";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
};
}

export function OrderTableRow({order}: OrderTableRowProps){
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  
  //Percorre lista de pedidos e quando encontrar o pedido com mesmo id troca o status para cancelado
  const {mutateAsync: cancelOrderFn} = useMutation({
    mutationFn: CancelOrder,
    async onSuccess(_, {orderId}){
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })
      ordersListCache.forEach(([cacheKey, cacheData])=>{
        if(!cacheData){
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order =>{
            if(order.orderId == orderId){
              return {...order, status: 'canceled'}
            }
            return order
          }),
        })
      })
    }
  })

    return(
      <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId}/>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix:true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status}/>
      </TableCell>
      <TableCell className="font-medium">
        {order.customerName}
      </TableCell>
      <TableCell className="font-medium">
        {order.total.toLocaleString(
          'pt-BR',{ 
            style:'currency', 
            currency:'BRL',
          })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button 
          onClick={()=>cancelOrderFn({orderId: order.orderId})}
          className="border-none" 
          size="xs" 
          variant='error'
          disabled={!['pending', 'processing'].includes(order.status)}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
    )
}