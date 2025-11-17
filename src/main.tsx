import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { RouterProvider } from 'react-router'
import { router } from './routes'

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
