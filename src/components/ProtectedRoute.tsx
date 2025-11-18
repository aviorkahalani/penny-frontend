import { Navigate, Outlet } from 'react-router'
import { useFetchMeQuery } from '@/store'

export default function ProtectedRoute() {
  const { data: user, error } = useFetchMeQuery()

  if (error) return <Navigate to="/" replace />

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
