import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import StarsBackground from '../components/StarsBackground'
import { useNavigate } from 'react-router-dom'

const Leaderboard = () => {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('global')
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchLeaderboard() }, [tab])

  const fetchLeaderboard = async () => {
    setLoading(true)
    let query = supabase.from('profiles').select('name, coins, streak, current_level').eq('role', 'student').order('coins', { ascending: false }).limit(50)
    const { data } = await query
    setPlayers(data || [])
    setLoading(false)
  }

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={{ fontFamily: 'Fredoka One', fontSize: 32, color: 'var(--accent)' }}>🏆 Leaderboard</h1>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['global', 'class'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`btn ${tab === t ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '10px 20px', fontSize: 14, flex: 1 }}>
              {t === 'global' ? '🌍 Global' : '📚 My Class'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 40 }}>⏳</div>
          </div>
        ) : players.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>👀</div>
            <h3>No players yet! Be the first! 🚀</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {players.map((p, i) => (
              <div key={i} className="card" style={{
                display: 'flex', alignItems: 'center', gap: 16,
                borderColor: i === 0 ? '#FFE66D' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : 'var(--border)',
                background: i < 3 ? `${i === 0 ? '#FFE66D' : i === 1 ? '#C0C0C0' : '#CD7F32'}10` : 'var(--card)'
              }}>
                <div style={{ fontFamily: 'Fredoka One', fontSize: 28, width: 40, textAlign: 'center' }}>
                  {i < 3 ? medals[i] : `#${i + 1}`}
                </div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka One', fontSize: 20, flexShrink: 0 }}>
                  {p.name?.[0] ?? '?'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                  <div style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 600 }}>Class {p.current_level} • 🔥 {p.streak} streak</div>
                </div>
                <div style={{ fontFamily: 'Fredoka One', fontSize: 20, color: 'var(--accent)' }}>
                  🪙 {p.coins}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
