import { useState, useEffect } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import StarsBackground from '../components/StarsBackground'

const subjects = [
  { id: 'maths', emoji: '🔢', name: 'Maths', color: '#FF6B6B', chapters: 12 },
  { id: 'english', emoji: '📖', name: 'English', color: '#4ECDC4', chapters: 10 },
  { id: 'science', emoji: '🔬', name: 'Science', color: '#A855F7', chapters: 14 },
  { id: 'social', emoji: '🌍', name: 'Social Studies', color: '#F97316', chapters: 10 },
]

const Dashboard = () => {
  const { profile, signOut, user } = useAuth()
  const [lang, setLang] = useState('en')
  const [badges, setBadges] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [showChapters, setShowChapters] = useState(false)
  const navigate = useNavigate()

  const coins = profile?.coins ?? 0
  const streak = profile?.streak ?? 0
  const level = profile?.current_level ?? 1
  const name = profile?.name ?? 'Student'

  useEffect(() => {
    if (user) fetchBadges()
  }, [user])

  const fetchBadges = async () => {
    const { data } = await supabase.from('badges').select('*').eq('student_id', user.id)
    setBadges(data || [])
  }

  const handleSubjectClick = (sub) => {
    setSelectedSubject(sub)
    setShowChapters(true)
  }

  const handleChapterClick = (sub, chapter) => {
    navigate(`/quiz/${sub.id}/${chapter}`)
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />

      {/* Chapter Modal */}
      {showChapters && selectedSubject && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 480, maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Fredoka One', fontSize: 26, color: selectedSubject.color }}>
                {selectedSubject.emoji} {selectedSubject.name}
              </h2>
              <button className="btn btn-ghost" style={{ padding: '8px 16px' }} onClick={() => setShowChapters(false)}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 10 }}>
              {Array.from({ length: selectedSubject.chapters }, (_, i) => (
                <button key={i} onClick={() => handleChapterClick(selectedSubject, i + 1)}
                  className="btn" style={{
                    background: selectedSubject.color, color: 'white',
                    padding: '12px 8px', fontSize: 14, flexDirection: 'column', gap: 4
                  }}>
                  <span style={{ fontSize: 18 }}>📖</span>
                  <span>Ch {i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', background: 'rgba(30,30,58,0.9)',
        backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🎓</span>
          <span style={{ fontFamily: 'Fredoka One', fontSize: 20, color: 'var(--primary)' }}>EduQuest</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--card)', padding: '8px 16px', borderRadius: 50, border: '1px solid #FFE66D40' }}>
            <span style={{ fontSize: 20 }}>🪙</span>
            <span style={{ fontWeight: 800, color: 'var(--accent)' }}>{coins}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--card)', padding: '8px 16px', borderRadius: 50, border: '1px solid #F9731640' }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <span style={{ fontWeight: 800, color: '#F97316' }}>{streak}</span>
          </div>
          <button onClick={signOut} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 2 }}>

        {/* Welcome */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #FF6B6B20, #4ECDC420)',
          borderColor: 'var(--primary)', marginBottom: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16
        }}>
          <div>
            <h1 style={{ fontSize: 32, marginBottom: 6 }}>
              {lang === 'en' ? `Hey ${name}! 👋` : `नमस्ते ${name}! 👋`}
            </h1>
            <p style={{ color: 'var(--text2)', fontWeight: 700 }}>
              {lang === 'en' ? `You're on Class ${level}! Keep going! 🚀` : `आप Class ${level} पर हैं! आगे बढ़ते रहो! 🚀`}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48 }}>🏅</div>
            <div style={{ fontFamily: 'Fredoka One', fontSize: 20, color: 'var(--accent)' }}>Class {level}</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { emoji: '🪙', label: 'Coins', value: coins, color: 'var(--accent)' },
            { emoji: '🔥', label: 'Day Streak', value: streak, color: '#F97316' },
            { emoji: '📚', label: 'Current Level', value: `Class ${level}`, color: 'var(--secondary)' },
            { emoji: '🏆', label: 'Badges', value: badges.length, color: 'var(--purple)' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', borderColor: stat.color + '40' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{stat.emoji}</div>
              <div style={{ fontFamily: 'Fredoka One', fontSize: 24, color: stat.color }}>{stat.value}</div>
              <div style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 700 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subjects */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <h2 style={{ fontSize: 28 }}>{lang === 'en' ? '📚 Choose Your Subject!' : '📚 विषय चुनें!'}</h2>
          <button className="btn btn-accent" style={{ fontSize: 14, padding: '10px 20px' }} onClick={() => navigate('/leaderboard')}>
            🏆 Leaderboard
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 30 }}>
          {subjects.map((sub, i) => (
            <div key={i} className="card" style={{
              cursor: 'pointer', transition: 'all 0.2s',
              borderColor: sub.color + '60',
              background: `linear-gradient(135deg, ${sub.color}15, var(--card))`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = sub.color }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = sub.color + '60' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>{sub.emoji}</div>
              <h3 style={{ fontFamily: 'Fredoka One', fontSize: 22, color: sub.color, marginBottom: 6 }}>{sub.name}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{sub.chapters} Chapters</p>
              <div style={{ height: 8, background: 'var(--bg2)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '0%', background: `linear-gradient(90deg, ${sub.color}, ${sub.color}80)`, borderRadius: 4 }} />
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 12, fontWeight: 700, marginTop: 6 }}>0% Complete</p>
              <button className="btn" onClick={() => handleSubjectClick(sub)} style={{
                background: sub.color, color: 'white', width: '100%', marginTop: 16, padding: '10px', fontSize: 14
              }}>
                {lang === 'en' ? 'Play Now! 🎮' : 'खेलो! 🎮'}
              </button>
            </div>
          ))}
        </div>

        {/* Badges */}
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>🏅 Your Badges</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 30 }}>
          {badges.length === 0 ? (
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', opacity: 0.5 }}>
              <span style={{ fontSize: 28 }}>🔒</span>
              <span style={{ fontWeight: 800 }}>Complete a quiz to earn badges!</span>
            </div>
          ) : badges.map((badge, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px' }}>
              <span style={{ fontSize: 28 }}>{badge.badge_emoji}</span>
              <span style={{ fontWeight: 800 }}>{badge.badge_name}</span>
            </div>
          ))}
        </div>

        {/* AI Teacher */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #A855F720, #3B82F620)',
          borderColor: '#A855F7',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16
        }}>
          <div>
            <h3 style={{ fontSize: 24, marginBottom: 8, color: '#A855F7' }}>🤖 Ask AI Teacher!</h3>
            <p style={{ color: 'var(--text2)', fontWeight: 700 }}>
              {lang === 'en' ? 'Stuck on something? AI explains in Hindi & English!' : 'कुछ समझ नहीं आया? AI Hindi & English में समझाएगा!'}
            </p>
          </div>
          <button className="btn btn-purple" onClick={() => navigate('/ai-teacher')} style={{ fontSize: 16, padding: '14px 28px' }}>
            💬 Ask Now!
          </button>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
