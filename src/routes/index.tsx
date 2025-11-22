import { createBrowserRouter } from 'react-router'
import { authMiddleware } from './middlewares/auth'

import App from '@/App'
import Home from '@/pages/Home'
// import HydrateFallback from '@/components/HydrateFallback'
import ProtectedRoute from '@/components/ProtectedRoute'
import Error from '@/pages/Error'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    // hydrateFallbackElement: <HydrateFallback />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        middleware: [authMiddleware],
        Component: ProtectedRoute,
        children: [
          {
            path: 'planning',
            lazy: async () => ({
              Component: (await import('@/pages/Planning')).default,
            }),
          },

          {
            path: 'tracking',
            lazy: async () => ({
              Component: (await import('@/pages/Tracking')).default,
            }),
          },
          {
            path: 'dashboard',
            lazy: async () => ({
              Component: (await import('@/pages/Dashboard')).default,
            }),
          },
          {
            path: 'profile',
            lazy: async () => ({
              Component: (await import('@/pages/Profile')).default,
            }),
          },
          {
            path: 'edit/:id?',
            lazy: async () => ({
              Component: (await import('@/pages/Budget')).default,
            }),
          },
          {
            path: 'budget/:id',
            lazy: async () => ({
              Component: (await import('@/pages/BudgetDetail')).default,
            }),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('@/pages/Login')).default,
    }),
  },
  {
    path: '/register',
    lazy: async () => ({
      Component: (await import('@/pages/Register')).default,
    }),
  },
])
