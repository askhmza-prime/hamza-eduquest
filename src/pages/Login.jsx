import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import StarsBackground from '../components/StarsBackground'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await signIn(email, password)
    if (error) setError(error.message)
    else {
      const role = data?.user?.user_metadata?.role
      if (role === 'admin') navigate('/admin')
      else navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
      <StarsBackground />
      <div className="card animate-bounce-in" style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 60, marginBottom: 10 }}>🏆</div>
          <h1 style={{ fontSize: 32, color: 'var(--secondary)' }}>Welcome Back!</h1>
          <p style={{ color: 'var(--text2)', fontWeight: 600, marginTop: 6 }}>Continue your adventure! 🎮</p>
        </div>
        {error && (
          <div style={{ background: '#FF6B6B20', border: '1px solid #FF6B6B', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#FF6B6B', fontSize: 14, fontWeight: 700 }}>
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>📧 Email</label>
            <input className="input" type="email" placeholder="your@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>🔒 Password</label>
            <input className="input" type="password" placeholder="Your password"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-secondary" style={{ fontSize: 17, padding: '16px', marginTop: 8 }} disabled={loading}>
            {loading ? '⏳ Logging in...' : '🎮 Let\'s Play!'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)', fontWeight: 700 }}>
          New player? <Link to="/register" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 800 }}>Join FREE!</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
