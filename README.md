# 🎮 Hamza EduQuest

A gamified learning platform for Class 1-12 students!

## 🚀 Tech Stack
- **Frontend**: React + Vite
- **Backend/DB**: Supabase
- **Hosting**: Vercel
- **AI**: Gemini API (coming Phase 3)
- **Notifications**: Twilio WhatsApp (coming Phase 4)

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables
Create a `.env` file (already included with your keys)

### 3. Setup Supabase Database
- Go to your Supabase project
- Click **SQL Editor**
- Copy & paste everything from `supabase-schema.sql`
- Click **Run**

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy to Vercel
- Push to GitHub
- Connect repo on vercel.com
- Add environment variables in Vercel dashboard
- Deploy! ✅

## 📁 Project Structure
```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── lib/            # Supabase client & Auth
└── styles/         # Global CSS
```

## 🗺️ Roadmap
- [x] Phase 1 - Foundation (Auth, UI, Routing)
- [ ] Phase 2 - Game System (Coins, Badges, Leaderboard)
- [ ] Phase 3 - AI Teacher (Gemini API)
- [ ] Phase 4 - WhatsApp Notifications
- [ ] Phase 5 - Admin Panel (Full)
- [ ] Phase 6 - Mobile App (React Native)

Made with ❤️ by Hamza
