import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import StarsBackground from '../components/StarsBackground'

const AdminDashboard = () => {
  const { signOut } = useAuth()
  const [students, setStudents] = useState([])
  const [stats, setStats] = useState({ total: 0, active: 0, flags: 0 })
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('role', 'student')
    if (data) {
      setStudents(data)
      setStats({ total: data.length, active: data.filter(s => s.streak > 0).length, flags: 0 })
    }
    setLoading(false)
  }

  const tabs = [
    { id: 'overview', emoji: '📊', label: 'Overview' },
    { id: 'students', emoji: '👧', label: 'Students' },
    { id: 'questions', emoji: '📝', label: 'Questions' },
    { id: 'flags', emoji: '🚨', label: 'Cheat Flags' },
  ]

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', background: 'rgba(30,30,58,0.95)',
        backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>👑</span>
          <span style={{ fontFamily: 'Fredoka One', fontSize: 20, color: 'var(--accent)' }}>Admin Panel</span>
          <span style={{ background: 'var(--primary)', color: 'white', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 50 }}>GOD MODE</span>
        </div>
        <button onClick={signOut} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>Logout</button>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 30 }}>
          {[
            { emoji: '👧', label: 'Total Students', value: stats.total, color: 'var(--secondary)' },
            { emoji: '🔥', label: 'Active Today', value: stats.active, color: '#F97316' },
            { emoji: '🚨', label: 'Cheat Flags', value: stats.flags, color: 'var(--primary)' },
            { emoji: '🪙', label: 'Rewards Given', value: '0', color: 'var(--accent)' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', borderColor: s.color + '40' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'Fredoka One', fontSize: 28, color: s.color }}>{s.value}</div>
              <div style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`btn ${tab === t.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '10px 20px', fontSize: 14 }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
        {tab === 'overview' && (
          <div>
            <h2 style={{ fontSize: 26, marginBottom: 16 }}>📊 Platform Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="card">
                <h3 style={{ color: 'var(--secondary)', marginBottom: 16, fontSize: 20 }}>📈 Subject Activity</h3>
                {['Maths 🔢', 'English 📖', 'Science 🔬', 'Social 🌍'].map((s, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{s}</span>
                    </div>
                    <div style={{ height: 8, background: 'var(--bg2)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: `${30 + i * 15}%`, background: 'var(--primary)', borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 style={{ color: 'var(--accent)', marginBottom: 16, fontSize: 20 }}>🏆 Level Distribution</h3>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 700 }}>Class {i * 2 + 1}-{i * 2 + 2}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 800 }}>0 students</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 'students' && (
          <div>
            <h2 style={{ fontSize: 26, marginBottom: 16 }}>👧 All Students</h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text2)' }}>⏳ Loading...</div>
            ) : students.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>👀</div>
                <h3 style={{ color: 'var(--text2)' }}>No students yet!</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {students.map((s, i) => (
                  <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka One', fontSize: 20 }}>
                        {s.name?.[0] ?? '?'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                        <div style={{ color: 'var(--text2)', fontSize: 13 }}>{s.email}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ background: 'var(--secondary)20', color: 'var(--secondary)', padding: '4px 12px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>Class {s.current_level}</span>
                      <span style={{ background: 'var(--accent)20', color: 'var(--accent)', padding: '4px 12px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>🪙 {s.coins}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 'flags' && (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
            <h3 style={{ color: 'var(--green)', fontSize: 24 }}>No cheat flags yet!</h3>
          </div>
        )}
        {tab === 'questions' && (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🤖</div>
            <h3 style={{ fontSize: 24, marginBottom: 8 }}>AI Question Generator</h3>
            <p style={{ color: 'var(--text2)', fontWeight: 700, marginBottom: 24 }}>Coming in Phase 3!</p>
            <button className="btn btn-purple" style={{ fontSize: 16 }}>🔮 Coming Soon!</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
