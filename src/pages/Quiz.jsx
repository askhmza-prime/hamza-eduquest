import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { saveResult, checkAndAwardBadges } from '../lib/gameLogic'
import CoinAnimation from '../components/CoinAnimation'
import LevelUp from '../components/LevelUp'
import StarsBackground from '../components/StarsBackground'

const Quiz = () => {
  const { subject, chapter } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [timePerQ, setTimePerQ] = useState([])
  const [timer, setTimer] = useState(30)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)
  const [showCoin, setShowCoin] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newBadges, setNewBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const startTime = useRef(Date.now())
  const lang = profile?.language_pref || 'en'

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    if (done || loading || questions.length === 0) return
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { handleNext(true); return 30 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [current, done, loading, questions])

  const fetchQuestions = async () => {
    const { data } = await supabase.from('questions')
      .select('*')
      .eq('class_level', profile?.current_level || 1)
      .eq('subject', subject)
      .eq('chapter', parseInt(chapter))
      .eq('language', lang)
      .limit(10)
    setQuestions(data || [])
    setLoading(false)
  }

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
  }

  const handleNext = async (timeout = false) => {
    const timeTaken = Math.round((Date.now() - startTime.current) / 1000)
    const newTimePerQ = [...timePerQ, timeTaken]
    setTimePerQ(newTimePerQ)
    startTime.current = Date.now()

    const correct = !timeout && selected === questions[current]?.correct_answer
    if (correct) setScore(s => s + 1)
    setAnswers([...answers, selected])

    if (current + 1 >= questions.length) {
      const finalScore = score + (correct ? 1 : 0)
      await saveResult(user.id, profile.current_level, subject, parseInt(chapter), finalScore, questions.length, newTimePerQ)
      const badges = await checkAndAwardBadges(user.id)
      setNewBadges(badges)
      if (finalScore / questions.length >= 0.7) setShowCoin(true)
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setTimer(30)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 60 }}>⏳</div>
        <p style={{ fontFamily: 'Fredoka One', fontSize: 24, color: 'var(--primary)', marginTop: 16 }}>Loading Questions...</p>
      </div>
    </div>
  )

  if (questions.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ textAlign: 'center', padding: 60, maxWidth: 400 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>📚</div>
        <h2 style={{ fontSize: 28, marginBottom: 8 }}>No Questions Yet!</h2>
        <p style={{ color: 'var(--text2)', fontWeight: 700, marginBottom: 24 }}>Questions for this chapter are coming soon!</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  )

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
      <StarsBackground />
      <CoinAnimation show={showCoin} amount={score >= questions.length * 0.7 ? 50 : 20} />
      <div className="card animate-bounce-in" style={{ textAlign: 'center', maxWidth: 440, width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>
          {score / questions.length >= 0.7 ? '🏆' : score / questions.length >= 0.5 ? '😊' : '😅'}
        </div>
        <h1 style={{ fontFamily: 'Fredoka One', fontSize: 36, marginBottom: 8, color: 'var(--accent)' }}>
          Quiz Done!
        </h1>
        <div style={{ fontSize: 52, fontFamily: 'Fredoka One', color: score / questions.length >= 0.7 ? 'var(--green)' : 'var(--primary)', marginBottom: 16 }}>
          {score}/{questions.length}
        </div>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text2)', marginBottom: 24 }}>
          {score / questions.length >= 0.7 ? '🎉 Excellent! +50 coins earned!' : score / questions.length >= 0.5 ? '👍 Good job! +20 coins earned!' : '💪 Keep practicing!'}
        </p>
        {newBadges.length > 0 && (
          <div style={{ background: 'var(--bg2)', borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <p style={{ fontWeight: 800, marginBottom: 10, color: 'var(--accent)' }}>🏅 New Badges Earned!</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {newBadges.map((b, i) => (
                <span key={i} style={{ fontSize: 24 }}>{b.badge_emoji} {b.badge_name}</span>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setTimePerQ([]); setScore(0); setDone(false); setTimer(30); fetchQuestions() }}>
            🔄 Try Again
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
            🏠 Dashboard
          </button>
        </div>
      </div>
    </div>
  )

  const q = questions[current]
  const timerColor = timer <= 10 ? '#FF6B6B' : timer <= 20 ? '#F97316' : 'var(--secondary)'

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <StarsBackground />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px 20px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div style={{ fontFamily: 'Fredoka One', fontSize: 18, color: 'var(--text2)' }}>
            {current + 1} / {questions.length}
          </div>
          <div style={{ fontFamily: 'Fredoka One', fontSize: 24, color: timerColor, background: 'var(--card)', padding: '8px 16px', borderRadius: 50, border: `2px solid ${timerColor}` }}>
            ⏱ {timer}s
          </div>
        </div>

        <div style={{ height: 8, background: 'var(--bg2)', borderRadius: 4, marginBottom: 30, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((current + 1) / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: 4, transition: 'width 0.3s ease' }} />
        </div>

        <div className="card" style={{ marginBottom: 24, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 800, textAlign: 'center', lineHeight: 1.5 }}>{q?.question}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q?.options?.map((opt, idx) => {
            let bg = 'var(--card)'
            let border = 'var(--border)'
            if (selected !== null) {
              if (idx === q.correct_answer) { bg = '#22C55E20'; border = '#22C55E' }
              else if (idx === selected && selected !== q.correct_answer) { bg = '#FF6B6B20'; border = '#FF6B6B' }
            } else if (selected === idx) { bg = 'var(--primary)20'; border = 'var(--primary)' }

            return (
              <button key={idx} onClick={() => handleSelect(idx)} style={{
                background: bg, border: `2px solid ${border}`,
                borderRadius: 16, padding: '16px 20px', cursor: 'pointer',
                fontFamily: 'Nunito', fontSize: 16, fontWeight: 700,
                color: 'var(--text)', textAlign: 'left', transition: 'all 0.2s'
              }}>
                <span style={{ marginRight: 12, fontFamily: 'Fredoka One', color: 'var(--text2)' }}>
                  {['A', 'B', 'C', 'D'][idx]}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <button className="btn btn-primary" style={{ width: '100%', marginTop: 20, fontSize: 18, padding: '16px' }} onClick={() => handleNext()}>
            {current + 1 >= questions.length ? '🏁 Finish Quiz!' : 'Next Question →'}
          </button>
        )}
      </div>
      <LevelUp show={showLevelUp} level={profile?.current_level} onClose={() => setShowLevelUp(false)} />
    </div>
  )
}

export default Quiz
