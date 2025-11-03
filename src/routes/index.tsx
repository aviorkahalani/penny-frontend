import { createBrowserRouter } from 'react-router'

import App from '@/App'
import Home from '@/pages/Home'
import Planning from '@/pages/Planning'
import Tracking from '@/pages/Tracking'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ProtectedRoute from '@/components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'planning',
        element: (
          <ProtectedRoute>
            <Planning />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tracking',
        element: (
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])
