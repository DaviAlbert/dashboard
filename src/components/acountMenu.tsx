import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import {DropdownMenu} from './ui/dropdown-menu'
import {Button} from './ui/button'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetProfile } from '@/api/getProfile'
import { getManagedRestaurant } from '@/api/getManagedRestaurant'
import { Skeleton } from './ui/skeleton'
import { Dialog, DialogTrigger } from './ui/dialog'
import { StoreProfileDialog } from './storeProfileDialog'
import { signOut } from '@/api/signOut'
import {useNavigate} from 'react-router-dom'

export function AccoutMenu(){
    const navigate = useNavigate()

    const {data:profile, isLoading: isLoadingProfile} = useQuery({
        queryKey:['profile'],
        queryFn: GetProfile,
    })
    const {data:managedRestaurant, isLoading: isLoadingManagedRestaurant} = useQuery({
        queryKey:['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    })

    const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
          navigate('/signIn', { replace: true })
        },
      })

    return(
        <Dialog>
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2 select-none'>
                    {isLoadingManagedRestaurant ?
                        (<Skeleton className='h-4 w-40'>Carregando</Skeleton>):
                        (managedRestaurant?.name)
                    }
                    <ChevronDown className='w-4 h-4'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56 bg-muted p-[5px] rounded-[5px] text-center'>
                <DropdownMenuLabel className='flex flex-col'>
                    {isLoadingProfile ?(
                        <div className='space-y-1.5'>
                            <Skeleton className='h-4 w-32'/>
                            <Skeleton className='h-3 w-24'/>
                        </div>
                    ):(
                        <>
                            <span>{profile?.name}</span>
                            <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                        </>
                    )}
                    <span className='text-cs font-normal text-muted-foreground'>Ddiego@rocketseat.com.br</span>
                </DropdownMenuLabel>
                <DialogTrigger asChild>
                <DropdownMenuItem className='mt-[10px]'>
                    <Button className='w-full border-none bg-muted-foreground p-[5px]'>
                    <Building className='w-4 h-4 mr-2'/>
                    <span>Perfil da loja</span>
                    </Button>
                </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem asChild disabled={isSigningOut}>
                    <Button variant='error' className='w-full border-none mt-[15px]' onClick={()=>signOutFn()}>
                        <LogOut className='w-4 h-4 mr-2'/>
                        <span>Sair</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <StoreProfileDialog/>
        </Dialog>
    )
}