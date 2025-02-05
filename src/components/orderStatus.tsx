export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-[10px] w-[10px] rounded-full bg-chart-3" />
      )}
      {status === 'canceled' && (
        <span className="h-[10px] w-[10px] rounded-full bg-chart-5" />
      )}
      {status === 'delivered' && (
        <span className="h-[10px] w-[10px]  rounded-full bg-chart-2" />
      )}
      {['processing', 'delivering'].includes(status) && (
        <span className="h-[10px] w-[10px]  rounded-full bg-chart-1" />
      )}
      <span className="font-medium text-muted-foreground ml-[5px]">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}