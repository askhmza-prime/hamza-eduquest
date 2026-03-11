const GEMINI_API_KEY = 'AIzaSyCZAUlOzu_ZDizkS6oonSk8ykfDZnsNqCU'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`

export const askGemini = async (question, subject, classLevel, language) => {
  try {
    const langText = language === 'hi' ? 'Hindi' : 'English'
    const prompt = `You are a friendly AI teacher for Indian school students. 
A Class ${classLevel} student is studying ${subject} and asked: "${question}"
Answer in ${langText} in a simple, fun way that a Class ${classLevel} student can understand.
Keep answer short — max 4-5 lines. Use emojis to make it fun!`

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      })
    })
    const data = await response.json()
    console.log('Gemini response:', data)
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not answer that!'
  } catch (err) {
    console.error('Gemini error:', err)
    return 'Sorry, something went wrong! Try again! 😅'
  }
}
