import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import StarsBackground from '../components/StarsBackground'

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', classLevel: '1', parentWhatsapp: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signUp(
      form.email, form.password, form.name,
      parseInt(form.classLevel), form.parentWhatsapp
    )
    if (error) setError(error.message)
    else navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
      <StarsBackground />
      <div className="card animate-bounce-in" style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 60, marginBottom: 10 }}>🎮</div>
          <h1 style={{ fontSize: 32, color: 'var(--primary)' }}>Join EduQuest!</h1>
          <p style={{ color: 'var(--text2)', fontWeight: 600, marginTop: 6 }}>Start your learning adventure 🚀</p>
        </div>
        {error && (
          <div style={{ background: '#FF6B6B20', border: '1px solid #FF6B6B', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#FF6B6B', fontSize: 14, fontWeight: 700 }}>
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>👤 Your Name</label>
            <input className="input" placeholder="Enter your name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>📧 Email</label>
            <input className="input" type="email" placeholder="your@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>🔒 Password</label>
            <input className="input" type="password" placeholder="Create a strong password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>📚 Which Class?</label>
            <select className="input" value={form.classLevel}
              onChange={e => setForm({ ...form, classLevel: e.target.value })}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Class {i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 800, fontSize: 14, color: 'var(--text2)' }}>📱 Parent's WhatsApp Number</label>
            <input className="input" placeholder="+91 98765 43210" value={form.parentWhatsapp}
              onChange={e => setForm({ ...form, parentWhatsapp: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ fontSize: 17, padding: '16px', marginTop: 8 }} disabled={loading}>
            {loading ? '⏳ Creating Account...' : '🚀 Start Playing FREE!'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)', fontWeight: 700 }}>
          Already a player? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800 }}>Login here!</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
