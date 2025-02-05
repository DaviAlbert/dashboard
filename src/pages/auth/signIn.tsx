import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/SignIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn(){
    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SignInForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
      })

    async function HandleSignIn(data: SignInForm){
        try {
            const response = await authenticate({ email: data.email })
            console.log(response)
            toast.success('Enviamos um link de autenticação para seu email.',{
                action:{
                    label:'SignIn',
                    onClick:()=> HandleSignIn(data),
                }
            })
        } catch (error) {
            toast.error(`Erro ao fazer o login: ${error}`)
        }
    }

    return(
        <>
            <Helmet title='Login'/>
            <div className='p-8'>
            <Button className="absolute left-8 top-8 border-none top-[10px] right-[10px] p-[10px]">
                <Link to="/signUp" className="no-underline text-inherit">
                    Novo estabelecimento
                </Link>
            </Button>
                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold traqcking-tight'>Acessar painel</h1>
                        <p className='text-sm text-muted-foreground'>Acompanhe suas vendar pelo painel do parceiro!</p>
                    </div>
                    <form onSubmit={handleSubmit(HandleSignIn)} className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Seu e-mail</Label>
                            <Input className='p-[10px] m-[5px]' id='emil' type='email' {...register('email')}/>
                        </div>
                        <Button disabled={isSubmitting} className='border-none p-[10px] w-[108%]' type='submit'>Acessar painel</Button>
                    </form>
                </div>
            </div>
        </>
    ) 
}