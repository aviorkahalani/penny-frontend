import { createBrowserRouter } from 'react-router'
import { authMiddleware } from './middlewares/auth'

import { App } from '@/App'
import { Home } from '@/pages/Home'
import { Error } from '@/pages/Error'
import { HydrateFallback } from '@/components/global/HydrateFallback'
import { ProtectedRoute } from '@/components/global/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    hydrateFallbackElement: <HydrateFallback />,
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
              Component: (await import('@/pages/Planning')).Planning,
            }),
          },

          {
            path: 'tracking',
            lazy: async () => ({
              Component: (await import('@/pages/Tracking')).Tracking,
            }),
          },
          {
            path: 'dashboard',
            lazy: async () => ({
              Component: (await import('@/pages/Dashboard')).Dashboard,
            }),
          },
          {
            path: 'profile',
            lazy: async () => ({
              Component: (await import('@/pages/auth/Profile')).Profile,
            }),
          },
          {
            path: 'edit/:id?',
            lazy: async () => ({
              Component: (await import('@/pages/BudgetEditor')).BudgetEditor,
            }),
          },
          {
            path: 'budget/:id',
            lazy: async () => ({
              Component: (await import('@/pages/Budget')).Budget,
            }),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('@/pages/auth/Login')).Login,
    }),
  },
  {
    path: '/register',
    lazy: async () => ({
      Component: (await import('@/pages/auth/Register')).Register,
    }),
  },
])
