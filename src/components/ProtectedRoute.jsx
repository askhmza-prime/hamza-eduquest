import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 16, animation: 'spin 1s linear infinite' }}>⚙️</div>
        <p style={{ fontFamily: 'Fredoka One', fontSize: 24, color: 'var(--primary)' }}>Loading...</p>
      </div>
    </div>
  )
  return user ? children : <Navigate to="/login" />
}

export const AdminRoute = ({ children }) => {
  const { user, profile, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />
  if (profile?.role !== 'admin') return <Navigate to="/dashboard" />
  return children
}
