import { Navigate } from 'react-router'
import { useFetchMeQuery } from '@/store'

interface ProtectedRouteProps {
  children: React.ReactElement
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, error, isLoading } = useFetchMeQuery()

  if (!isLoading && (error || !user)) {
    return <Navigate to="/login" replace />
  }

  return children
}
