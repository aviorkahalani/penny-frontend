import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { Toaster } from '@/components/ui/toaster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </ReduxProvider>
    </ChakraProvider>
  </StrictMode>
)
