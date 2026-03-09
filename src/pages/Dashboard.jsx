import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import StarsBackground from '../components/StarsBackground'

const subjects = [
  { id: 'maths', emoji: '🔢', name: 'Maths', color: '#FF6B6B', chapters: 12 },
  { id: 'english', emoji: '📖', name: 'English', color: '#4ECDC4', chapters: 10 },
  { id: 'science', emoji: '🔬', name: 'Science', color: '#A855F7', chapters: 14 },
  { id: 'social', emoji: '🌍', name: 'Social Studies', color: '#F97316', chapters: 10 },
]

const badges = [
  { emoji: '⭐', name: 'First Quiz!' },
  { emoji: '🔥', name: '3 Day Streak' },
  { emoji: '🧠', name: 'Smart Cookie' },
]

const Dashboard = () => {
  const { profile, signOut } = useAuth()
  const [lang, setLang] = useState('en')

  const coins = profile?.coins ?? 0
  const streak = profile?.streak ?? 0
  const level = profile?.current_level ?? 1
  const name = profile?.name ?? 'Student'

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
          <button onClick={signOut} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
            Logout
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 2 }}>
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
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>
          {lang === 'en' ? '📚 Choose Your Subject!' : '📚 विषय चुनें!'}
        </h2>
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
                <div style={{ height: '100%', width: '30%', background: `linear-gradient(90deg, ${sub.color}, ${sub.color}80)`, borderRadius: 4 }} />
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 12, fontWeight: 700, marginTop: 6 }}>30% Complete</p>
              <button className="btn" style={{ background: sub.color, color: 'white', width: '100%', marginTop: 16, padding: '10px', fontSize: 14 }}>
                {lang === 'en' ? 'Play Now! 🎮' : 'खेलो! 🎮'}
              </button>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>🏅 Your Badges</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 30 }}>
          {badges.map((badge, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px' }}>
              <span style={{ fontSize: 28 }}>{badge.emoji}</span>
              <span style={{ fontWeight: 800 }}>{badge.name}</span>
            </div>
          ))}
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', opacity: 0.4 }}>
            <span style={{ fontSize: 28 }}>🔒</span>
            <span style={{ fontWeight: 800 }}>More badges to unlock!</span>
          </div>
        </div>
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
          <button className="btn btn-purple" style={{ fontSize: 16, padding: '14px 28px' }}>
            💬 Ask Now!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
