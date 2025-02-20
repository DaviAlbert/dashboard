import {Pizza} from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout(){
    return(
        <div className="grid h-[97vh] grid-cols-2 antialiased">
            <div className="flex w-[50%] h-full flex-col justify-between border-r border-foreground/5 p-10 text-muted-foreground">
                <div className="flex items-center gap-3 text-lg text-foreground">
                    <Pizza className=" h-5 w-5"/>
                    <span className="font-semibold">Pizza.shop</span>
                </div>
                <footer className="text-sm">
                    Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
                </footer>
            </div>
            <div className='flex flex-col items-center justify-center relative'>
                <Outlet/>
            </div>
        </div>
    )
}