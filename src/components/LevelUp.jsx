import { useEffect } from 'react'

const LevelUp = ({ show, level, onClose }) => {
  useEffect(() => {
    if (show) setTimeout(onClose, 3000)
  }, [show])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)'
    }}>
      <div className="animate-bounce-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 100, marginBottom: 20 }}>🏆</div>
        <h1 style={{
          fontFamily: 'Fredoka One', fontSize: 52,
          background: 'linear-gradient(135deg, #FFE66D, #FF6B6B)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>LEVEL UP!</h1>
        <p style={{ fontSize: 28, fontWeight: 800, color: 'white', marginTop: 10 }}>
          You reached Class {level}! 🎉
        </p>
        <div style={{ marginTop: 20, fontSize: 48 }}>🎊🎊🎊</div>
      </div>
    </div>
  )
}

export default LevelUp
