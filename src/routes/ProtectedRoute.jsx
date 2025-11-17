import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ roles }) {
  const token = useSelector((s) => s.auth.token)
  const role = useSelector((s) => s.auth.role)
  if (!token) return <Navigate to="/login" replace />
  if (roles && !roles.includes(role)) return <Navigate to="/403" replace />
  return <Outlet />
}