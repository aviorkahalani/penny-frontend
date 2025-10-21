import { createBrowserRouter } from 'react-router'

import App from '@/App'
import Home from '@/pages/Home'
import Planning from '@/pages/Planning'
import Tracking from '@/pages/Tracking'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

import { isAuthenticated } from './middlewares/isAuthenticated'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'planning',
        Component: Planning,
        middleware: [isAuthenticated],
      },
      {
        path: 'tracking',
        Component: Tracking,
        middleware: [isAuthenticated],
      },
      {
        path: 'dashboard',
        Component: Dashboard,
        middleware: [isAuthenticated],
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
])
