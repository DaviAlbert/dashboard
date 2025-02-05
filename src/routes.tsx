import {createBrowserRouter} from 'react-router-dom'
import { DashBoard } from './pages/app/dashboard/dashoboard'
import { SignIn } from './pages/auth/signIn'
import { AppLayout } from './pages/_Layouts/app'
import { AuthLayout } from './pages/_Layouts/auth'
import { SignUp } from './pages/auth/signUp'
import { Orders } from './pages/app/orders/orders'
import { NotFound } from './pages/app/404'

export const Router = createBrowserRouter([
    {
        path:'/',
        element: <AppLayout/>,
        errorElement:<NotFound/>,
        children: [
            {path:'/',element: <DashBoard/>},
            {path:'/orders',element: <Orders/>},
        ]
    },
    {
        path:'/',
        element: <AuthLayout/>,
        children: [
            {path:'/signIn',element: <SignIn/>},
            {path:'/signUp',element: <SignUp/>},
        ]
    },
])