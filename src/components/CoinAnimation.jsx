import { useEffect, useState } from 'react'

const CoinAnimation = ({ show, amount }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      setTimeout(() => setVisible(false), 2000)
    }
  }, [show])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 80, right: 20, zIndex: 9998,
      background: 'linear-gradient(135deg, #FFE66D, #F97316)',
      borderRadius: 50, padding: '12px 24px',
      fontFamily: 'Fredoka One', fontSize: 22, color: '#1a1a1a',
      animation: 'slide-up 0.3s ease',
      boxShadow: '0 8px 32px rgba(255,230,109,0.5)'
    }}>
      🪙 +{amount} Coins!
    </div>
  )
}

export default CoinAnimation
