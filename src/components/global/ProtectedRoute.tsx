import { Navigate, Outlet } from 'react-router'
import { useFetchMeQuery } from '@/store'

export const ProtectedRoute = () => {
  const { data: user, error, isLoading } = useFetchMeQuery()

  if (isLoading) return null

  if (error) return <Navigate to="/" replace />

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
