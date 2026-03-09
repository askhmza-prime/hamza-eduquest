import { Link } from 'react-router-dom'
import StarsBackground from '../components/StarsBackground'

const subjects = [
  { emoji: '🔢', name: 'Maths', color: '#FF6B6B' },
  { emoji: '📖', name: 'English', color: '#4ECDC4' },
  { emoji: '🔬', name: 'Science', color: '#A855F7' },
  { emoji: '🌍', name: 'Social Studies', color: '#F97316' },
]

const features = [
  { emoji: '🎮', title: 'Learn by Playing', desc: 'Fun quizzes, games & challenges!' },
  { emoji: '🏆', title: 'Level Up!', desc: 'Class 1 to Class 12 — your pace!' },
  { emoji: '🤖', title: 'AI Teacher', desc: 'Get help 24/7 in Hindi & English!' },
  { emoji: '💰', title: 'Earn Rewards', desc: 'Coins, badges & real prizes!' },
]

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <StarsBackground />
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', position: 'relative', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 32 }}>🎓</span>
          <span style={{ fontFamily: 'Fredoka One', fontSize: 24, color: '#FF6B6B' }}>EduQuest</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }}>Login</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>Join Free!</Link>
        </div>
      </nav>
      <section style={{ textAlign: 'center', padding: '60px 20px 40px', position: 'relative', zIndex: 2 }}>
        <div className="animate-float" style={{ fontSize: 80, marginBottom: 20 }}>🚀</div>
        <h1 style={{
          fontSize: 'clamp(36px, 8vw, 72px)', lineHeight: 1.1, marginBottom: 20,
          background: 'linear-gradient(135deg, #FF6B6B, #FFE66D, #4ECDC4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Learn. Play.<br />Level Up! 🎮
        </h1>
        <p style={{ fontSize: 20, color: 'var(--text2)', maxWidth: 500, margin: '0 auto 40px', fontWeight: 700 }}>
          The most fun way to learn from Class 1 to Class 12!
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: 18, padding: '16px 40px' }}>
            🎮 Start Playing FREE!
          </Link>
          <Link to="/login" className="btn btn-ghost" style={{ fontSize: 18, padding: '16px 40px' }}>
            Already a player? Login
          </Link>
        </div>
        <p style={{ marginTop: 16, color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
          ✅ 100% Free • No Credit Card • Class 1-12
        </p>
      </section>
      <section style={{ padding: '40px 20px', maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, marginBottom: 30 }}>4 Epic Subjects! 📚</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {subjects.map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', borderColor: s.color + '40' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'Fredoka One', fontSize: 20, color: s.color }}>{s.name}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '40px 20px', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, marginBottom: 30 }}>Why EduQuest? 🌟</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>{f.emoji}</div>
              <h3 style={{ fontSize: 20, marginBottom: 8, color: 'var(--accent)' }}>{f.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ textAlign: 'center', padding: '60px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
        <h2 style={{ fontSize: 36, marginBottom: 16 }}>Ready to become a Champion?</h2>
        <Link to="/register" className="btn btn-accent" style={{ fontSize: 20, padding: '18px 50px' }}>
          🚀 Join FREE Now!
        </Link>
      </section>
      <footer style={{ textAlign: 'center', padding: 30, color: 'var(--text2)', fontSize: 14, fontWeight: 600 }}>
        Made with ❤️ by Hamza • EduQuest 2024
      </footer>
    </div>
  )
}

export default Landing
