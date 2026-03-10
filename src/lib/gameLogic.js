import { supabase } from './supabase'

export const addCoins = async (userId, amount) => {
  const { data: profile } = await supabase
    .from('profiles').select('coins').eq('id', userId).single()
  await supabase.from('profiles')
    .update({ coins: (profile?.coins || 0) + amount }).eq('id', userId)
}

export const updateStreak = async (userId) => {
  const { data: profile } = await supabase
    .from('profiles').select('streak, last_active').eq('id', userId).single()
  const today = new Date().toISOString().split('T')[0]
  const lastActive = profile?.last_active
  const newStreak = lastActive === today ? profile.streak : (profile?.streak || 0) + 1
  await supabase.from('profiles')
    .update({ streak: newStreak, last_active: today }).eq('id', userId)
}

export const saveResult = async (userId, classLevel, subject, chapter, score, total, timePerQuestion) => {
  await supabase.from('results').insert({
    student_id: userId,
    class_level: classLevel,
    subject,
    chapter,
    score,
    total_questions: total,
    time_taken_per_question: timePerQuestion,
  })
  const percentage = (score / total) * 100
  if (percentage >= 70) await addCoins(userId, 50)
  else if (percentage >= 50) await addCoins(userId, 20)
  await updateStreak(userId)
}

export const checkAndAwardBadges = async (userId) => {
  const { data: results } = await supabase
    .from('results').select('*').eq('student_id', userId)
  const { data: existing } = await supabase
    .from('badges').select('badge_name').eq('student_id', userId)
  const earned = existing?.map(b => b.badge_name) || []

  const newBadges = []
  if (results?.length >= 1 && !earned.includes('First Quiz!'))
    newBadges.push({ student_id: userId, badge_name: 'First Quiz!', badge_emoji: '⭐' })
  if (results?.length >= 10 && !earned.includes('Quiz Master'))
    newBadges.push({ student_id: userId, badge_name: 'Quiz Master', badge_emoji: '🧠' })
  if (results?.filter(r => (r.score / r.total_questions) === 1).length >= 1 && !earned.includes('Perfect Score!'))
    newBadges.push({ student_id: userId, badge_name: 'Perfect Score!', badge_emoji: '💯' })

  if (newBadges.length > 0)
    await supabase.from('badges').insert(newBadges)
  return newBadges
    }
