import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/getManagedRestaurant";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { updateProfile } from "@/api/updateProfile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description:z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog(){
    const queryClient = useQueryClient()

    const {data:managedRestaurant} = useQuery({
        queryKey:['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    })
    const{register, handleSubmit, formState: {isSubmitting}} = useForm<StoreProfileSchema>({
        resolver:zodResolver(storeProfileSchema),
        values:{
            name:managedRestaurant?.name ?? '',
            description:managedRestaurant?.description ?? ''
        }
    })

    const {mutateAsync: updateProfileFn} = useMutation({
        mutationFn: updateProfile,
        onMutate({name, description}){
            const { cached } =UpdateManagedRestaurantCache({ description, name })
            console.log(cached)
            return {previousProfile: cached}
        },
        onError(_, __, context){
            console.log(context)
            if(context?.previousProfile){
                console.log(context.previousProfile)
                UpdateManagedRestaurantCache(context.previousProfile)
            }
        }
    })

    function UpdateManagedRestaurantCache({name, description}: StoreProfileSchema){
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

        if(cached){
            queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
                ...cached,
                name,
                description,
            })
        }
        return {cached}
    }

    async function handleUpdateProfile(data: StoreProfileSchema){
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })
            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error(`Não foi possivel atualizar o perfil: ${error}`)
        }
    }

    return(
        <DialogContent className="w-[75%] h-[50%] rounded-[8px]">
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao cliente.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 pag-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className='text-right mr-[5px]' htmlFor="name">Nome</Label>
                        <Input className="col-span-2 mb-[5px] border-muted-foreground p-[5px] w-[98%] text-muted-foreground bg-muted" id="name" {...register('name')}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className='text-right mr-[5px]' htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-2 resize-none text-muted-foreground border-muted-foreground bg-muted" id="description" {...register('description')}/>
                    </div>
                </div>
            <DialogFooter>
                <Button disabled={isSubmitting} className="border-none p-[10px] w-[75%] m-[5px] mx-auto" type="submit" variant='success'>Salvar</Button>
                <Button disabled={isSubmitting} className="border-none p-[10px] w-[50%] m-[5px] mx-auto" variant='error'>Cancelar</Button>
            </DialogFooter>
            </form>
        </DialogContent>
    )
}