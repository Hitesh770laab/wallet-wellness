# 💰 Wallet Wellness

> **Master Your Money. Build Better Habits.**
> A production-ready, cinematic 3D expense tracker built with React, Three.js, Framer Motion, and Tailwind CSS.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r167-black?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

---

## ✨ Features

- 🎬 **3D Hero Section** — Floating wallet, coins, and orbs rendered with React Three Fiber
- 📊 **Animated Dashboard** — Area charts, bar charts, radar charts via Recharts
- 💳 **Expense Tracker** — Add, filter, sort, and delete with micro-animations
- 🔮 **Deep Insights** — Savings trends, category radar, monthly comparisons
- 🔥 **Gamification** — Streaks, achievement badges, savings goals with progress bars
- 🌌 **Particle Field** — Interactive particle system that reacts to mouse movement
- 🖱️ **Custom Cursor** — Glowing dual-ring cursor with spring physics
- 📱 **Fully Responsive** — Mobile bottom nav + desktop sidebar navigation
- ⚡ **Lazy Loading** — 3D scene loaded asynchronously for optimal performance

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm or yarn

### Steps

```bash
# 1. Clone or download this project
git clone https://github.com/YOUR_USERNAME/wallet-wellness.git
cd wallet-wellness

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# (Edit .env if needed — no required variables for local dev)

# 4. Start the dev server
npm run dev

# 5. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build       # Compiles to /dist
npm run preview     # Preview the production build locally
```

---

## 🔐 .env File Safety Guide (IMPORTANT for GitHub)

This section explains how to keep secrets safe when publishing to GitHub.

### The Golden Rule
> ✅ Commit `.env.example` (template, no real values)
> ❌ NEVER commit `.env` (real secrets)

### Step-by-Step: Publishing Safely to GitHub

#### Step 1 — Verify .gitignore is correct
Open `.gitignore` and confirm `.env` is listed (it already is in this project):
```
.env
.env.local
.env.production
```

#### Step 2 — Create your local .env from the example
```bash
cp .env.example .env
```
Then fill in real values in `.env` only. Never touch `.env.example` with real values.

#### Step 3 — Check what Git is tracking (before first push)
```bash
git status
```
You should see `.env` listed under "Untracked files" or NOT listed at all — never under "Changes to be committed".

#### Step 4 — Initialize and push to GitHub
```bash
git init
git add .
git commit -m "feat: initial commit 🚀"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wallet-wellness.git
git push -u origin main
```

#### Step 5 — Verify on GitHub
Go to your repo on GitHub → browse the file list.
You should see `.env.example` ✅ but NOT `.env` ✅

### If you accidentally committed .env

Run these commands immediately:
```bash
# Remove .env from Git tracking (keeps file locally)
git rm --cached .env
git commit -m "fix: remove .env from tracking"
git push

# If already pushed with secrets, rotate/invalidate those keys immediately
# Then use BFG Repo Cleaner to scrub history:
# https://rtyley.github.io/bfg-repo-cleaner/
```

### Environment Variables in This Project

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_APP_NAME` | No | Display name of the app |
| `VITE_APP_VERSION` | No | App version string |
| `VITE_ANALYTICS_KEY` | No | Optional analytics key |
| `VITE_SUPABASE_URL` | No | For future backend integration |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase public anon key |

> ⚠️ In Vite, only variables prefixed with `VITE_` are exposed to the browser.
> Never prefix secret server-side keys with `VITE_`.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Option A: Via CLI
npm i -g vercel
vercel

# Option B: Via GitHub
# 1. Push code to GitHub
# 2. Go to vercel.com → New Project
# 3. Import your GitHub repo
# 4. Vercel auto-detects Vite — click Deploy
```

**Add env vars in Vercel:**
Dashboard → Your Project → Settings → Environment Variables

### Deploy to Netlify

```bash
# Option A: Via CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Option B: Drag & Drop
# 1. Run: npm run build
# 2. Go to netlify.com → Sites → drag /dist folder
```

**Add env vars in Netlify:**
Site → Site Configuration → Environment Variables

---

## 📁 Project Structure

```
wallet-wellness/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx    # Premium loading animation
│   │   ├── CursorGlow.jsx       # Custom spring cursor
│   │   ├── ParticleField.jsx    # Canvas particle system
│   │   ├── Navbar.jsx           # Responsive navigation
│   │   ├── Scene3D.jsx          # Three.js 3D scene
│   │   ├── HeroSection.jsx      # Scroll-reactive hero
│   │   ├── Dashboard.jsx        # Overview + charts
│   │   ├── ExpensesView.jsx     # Add/manage expenses
│   │   ├── InsightsView.jsx     # Analytics & trends
│   │   └── GoalsView.jsx        # Gamification & goals
│   ├── data/
│   │   └── dummyData.js         # All mock data
│   ├── App.jsx                  # Root component + routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + utilities
├── .env.example                 # ✅ Safe to commit
├── .env                         # ❌ Never commit (in .gitignore)
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── netlify.toml
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| Three.js | r167 | 3D rendering |
| @react-three/fiber | 8 | React renderer for Three.js |
| @react-three/drei | 9 | Three.js helpers |
| Framer Motion | 11 | Animations & transitions |
| Tailwind CSS | 3.4 | Utility-first styling |
| Recharts | 2.12 | Charts & data visualization |
| Lucide React | 0.408 | Icon library |

---

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` → `theme.extend.colors.neon`

### Adding Expense Categories
Edit `src/data/dummyData.js` → `CATEGORIES` array

### Changing Currency
Search for `₹` across `src/` and replace with your currency symbol.
Update `toLocaleString('en-IN')` to your locale (e.g., `'en-US'`).

---

## 📝 License

MIT — free to use, modify, and distribute.

---

<p align="center">Built with 💜 · ~~Hitesh770laab</p>
