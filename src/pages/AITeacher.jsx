import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom'
import { askGemini } from '../lib/gemini'
import StarsBackground from '../components/StarsBackground'

const subjects = ['maths', 'english', 'science', 'social']

const AITeacher = () => {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [subject, setSubject] = useState('maths')
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Namaste! 🤖 I am your AI Teacher! Ask me anything about your Class ${profile?.current_level || 1} subjects! I can answer in Hindi or English! 😊` }
  ])
  const [loading, setLoading] = useState(false)
  const lang = profile?.language_pref || 'en'

  const handleAsk = async () => {
    if (!question.trim()) return
    const userMsg = { role: 'user', text: question }
    setMessages(prev => [...prev, userMsg])
    setQuestion('')
    setLoading(true)

    const answer = await askGemini(question, subject, profile?.current_level || 1, lang)
    setMessages(prev => [...prev, { role: 'ai', text: answer }])
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 24px', background: 'rgba(30,30,58,0.9)',
        backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => navigate('/dashboard')}>← Back</button>
        <span style={{ fontSize: 28 }}>🤖</span>
        <span style={{ fontFamily: 'Fredoka One', fontSize: 22, color: '#A855F7' }}>AI Teacher</span>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>

        {/* Subject selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {subjects.map(s => (
            <button key={s} onClick={() => setSubject(s)}
              className={`btn ${subject === s ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '8px 16px', fontSize: 13, textTransform: 'capitalize' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', display: 'flex',
          flexDirection: 'column', gap: 12, marginBottom: 16,
          padding: '10px 0'
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {msg.role === 'ai' && (
                <div style={{ fontSize: 28, marginRight: 10, alignSelf: 'flex-end' }}>🤖</div>
              )}
              <div style={{
                maxWidth: '80%', padding: '12px 16px', borderRadius: 16,
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                  : 'var(--card)',
                border: msg.role === 'ai' ? '1px solid #A855F740' : 'none',
                color: 'var(--text)', fontWeight: 600, lineHeight: 1.6,
                fontSize: 15, whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div style={{ fontSize: 28, marginLeft: 10, alignSelf: 'flex-end' }}>👤</div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 28 }}>🤖</div>
              <div className="card" style={{ padding: '12px 20px' }}>
                <span style={{ fontFamily: 'Fredoka One', color: '#A855F7' }}>Thinking... ✨</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder={lang === 'hi' ? 'कुछ भी पूछो... 😊' : 'Ask anything... 😊'}
            style={{
              flex: 1, padding: '14px 20px', borderRadius: 50,
              background: 'var(--card)', border: '2px solid #A855F740',
              color: 'var(--text)', fontFamily: 'Nunito', fontSize: 15,
              fontWeight: 700, outline: 'none'
            }}
          />
          <button onClick={handleAsk} disabled={loading}
            className="btn btn-purple"
            style={{ borderRadius: 50, padding: '14px 24px', fontSize: 20 }}>
            {loading ? '⏳' : '🚀'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AITeacher
