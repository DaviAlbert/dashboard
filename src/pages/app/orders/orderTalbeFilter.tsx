import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function OrderTableFilter(){
    return(
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID do cliente" className="text-muted-foreground font-medium h-8 w-auto mb-[5px] ml-[5px] p-[10px]" type="text" />
            <Input placeholder="Nome do cliente" className="text-muted-foreground font-medium h-8 w-[320px] mb-[5px] ml-[5px] p-[10px]" type="text" />
            <Select defaultValue="all" >
                <SelectTrigger className="text-muted-foreground ml-[5px] mb-[5px] p-[5px] w-[150px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value='all'>Todos Status</SelectItem>
                    <SelectItem value='pending'>Pendente</SelectItem>
                    <SelectItem value='canceled'>Cancelado</SelectItem>
                    <SelectItem value='processing'>Em preparo</SelectItem>
                    <SelectItem value='delivering'>Em entrega</SelectItem>
                    <SelectItem value='delivered'>Entregue</SelectItem>
                </SelectContent>
            </Select>
            <Button className="border-none mb-[5px] ml-[5px] p-[5px]" type="submit" variant='secondary' size='xs'>
                <Search className="h-4 w-4 mr-2"/>
                Filtrar resultados
            </Button>
            <Button className="mb-[5px] ml-[5px] p-[5px]" type="button" variant='outline' size='xs'>
                <X className="h-4 w-4 mr-2"/>
                Remover filtros
            </Button>
        </form>
    )
}