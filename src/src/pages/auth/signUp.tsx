import {Helmet} from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import {useForm} from 'react-hook-form'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import {z} from 'zod'
import {toast} from 'sonner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {registerRestaurant} from '@/api/registerRestaurant'

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type signUpForm = z.infer<typeof signUpForm>

export function SignUp(){
    const [searchParams] = useSearchParams()
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<signUpForm>({
        defaultValues:{
            email:searchParams.get('email') ?? ''
        }
    })
    const navigate = useNavigate()

    const { mutateAsync: registerRestaurantFn} = useMutation({
        mutationFn: registerRestaurant,
        onSuccess: () => {
            console.log("Restaurante registrado com sucesso!");
            // Aqui você pode invalidar queries ou atualizar o estado global
        },
        onError: (err) => {
            console.error("Erro ao registrar restaurante:", err);
        }
    });
    

    async function HandlesignUp(data: signUpForm){
        try {
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email:data.email,
                phone:data.phone,
            })
            console.log('sucesso')
            toast.success('Restaurante Cadastrado com sucesso!', {
                action:{
                    label:'SignUp',
                    onClick:()=> navigate(`/SignIn?email=${data.email}`),
                }
            })
        } catch (error) {
            toast.error(`Erro ao cadastrar o Restaurante: ${error}`)
        }
    }

    return(
        <>
            <Helmet title='Cadastro'/>
            <div className='p-8 w-[100%]' >
                <Button className="absolute left-8 top-8 border-none top-[10px] right-[10px] p-[10px]">
                    <Link to="/signIn" className="no-underline text-inherit">
                        Fazer login
                    </Link>
                </Button>
                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold traqcking-tight'>Criar conta</h1>
                        <p className='text-sm text-muted-foreground'>Seja um parceiro e comece suas vendas!</p>
                    </div>
                    <form onSubmit={handleSubmit(HandlesignUp)} className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
                            <Input className='p-[10px] m-[5px] text-white bg-gray-700' id='restaurantName' type='text' {...register('restaurantName')}/>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='managerName'>Seu nome</Label>
                            <Input className='p-[10px] m-[5px]' id='managerName' type='text' {...register('managerName')}/>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Seu e-mail</Label>
                            <Input className='p-[10px] m-[5px]' id='email' type='email' {...register('email')}/>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='phone'>Seu celular</Label>
                            <Input className='p-[10px] m-[5px]' id='phone' type='tel' {...register('phone')}/>
                        </div>
                        <Button disabled={isSubmitting} className='border-none p-[10px] w-[108%]' type='submit'>
                            Finalizar cadastro
                        </Button>
                        <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                            Ao continuar você concorda com nossos 
                            <a href="#" className='underline underline-offset-4 text-foreground'> Termos de serviço </a> 
                            e 
                            <a href="#" className='underline underline-offset-4 text-foreground'> Política de privacidade</a> 
                        </p>
                    </form>
                </div>
            </div>
        </>
    ) 
}