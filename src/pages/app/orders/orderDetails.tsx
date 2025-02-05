import { getOrderDetails } from '@/api/getOrderDetails'
import { OrderStatus } from '@/components/orderStatus'
import {formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
  import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'

  export interface OrderDetailsProps{
    orderId: string
    open: boolean
  }

  export function OrderDetails({orderId, open}: OrderDetailsProps) {
    const {data: order} = useQuery({
      queryKey: ['order', orderId],
      queryFn: ()=> getOrderDetails({orderId}),
      enabled:open,
    })

    return (
      <DialogContent className='w-[75%] rounded-[8px] p-[5px]'>
        <DialogHeader>
          <DialogTitle>Pedido: <div className='text-muted-foreground'>{orderId}</div></DialogTitle>
          <DialogDescription className='text-[17px]'>Detalhes do pedido</DialogDescription>
        </DialogHeader>
        {order && (<div className="space-y-6">
          <Table className='bg-slate-500'>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      <OrderStatus status={order.status}/>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className='bg-muted/50'>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                {order.customer.name ? order.customer.name : 'Nome não informado'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Telefone</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone ? order.customer.phone : 'telefone não informado'}
                </TableCell>
              </TableRow>
              <TableRow className='bg-muted/50'>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                {order.customer.email ? order.customer.email : 'Email não informado'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado Há
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(order.createdAt, {locale: ptBR, addSuffix:true,})}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow className='bg-muted/50'>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item)=>(
                <TableRow key={item.id} className='bg-muted/50'>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {(item.priceInCents/100).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}
                </TableCell>
                <TableCell className="text-right">
                  {((item.priceInCents * item.quantity)/100).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className='bg-background text-[18px]'>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium text-chart-2">
                  {(order.totalInCents/100).toLocaleString('pt-BR',{style:'currency', currency:'BRL'})}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>)}
      </DialogContent>
    )
  }