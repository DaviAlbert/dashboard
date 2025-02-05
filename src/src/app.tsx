import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import {Toaster} from 'sonner'
import { ThemeProvider } from './components/theme/themeProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'

function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey='pizzaShopTheme' defaultTheme='dark'>
        <Helmet titleTemplate='%s | pizza.shop'/>
        <Toaster richColors/>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router}/>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
