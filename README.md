
<div align="center">

# 🌱 GreenPoints

### Small Actions. Greener Campuses. Bigger Impact.

A gamified sustainability web app that helps college students build eco-friendly habits through daily challenges, points, streaks, badges, and a shared campus impact dashboard.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![localStorage](https://img.shields.io/badge/Storage-localStorage-10B981)

</div>

---

## 🌍 About

Many students want to help the environment but don't know where to start. **GreenPoints** turns sustainability into a daily habit: pick a small eco-friendly action, complete it, earn points, keep your streak alive, and watch individual effort add up to collective campus impact.

Built as a fully working demo for a college innovation competition. No backend, API key, or sign-up needed.

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Daily Challenges
![Daily Challenges](screenshots/challenges.png)

### Campus Impact
![Campus Impact](screenshots/campus-impact.png)

## ✨ Features

- **Dashboard:** animated progress ring, live stat cards (points, challenges, streak, level), today's challenges, and a 7-day streak calendar
- **Daily Challenges:** 10 challenges with Easy / Medium / Hard badges, category filters, search, and automatic daily reset
- **Achievements:** 7 badges that unlock from real activity, with locked and unlocked states
- **Campus Impact:** campus stats, semester goal, weekly activity chart, category breakdown, and a personal "Your Contribution" section
- **Leaderboard:** weekly and all-time tabs, with your rank updating live as you earn points
- **Profile:** editable name, lifetime stats, streaks, badge collection, challenge history, light/dark theme, and a confirmed reset
- **Persistent progress** using `localStorage`, with duplicate-reward prevention and undo

## 🎮 Gamification

### Levels

| Level | Points |
|---|---|
| Eco Rookie | 0 – 99 |
| Green Explorer | 100 – 249 |
| Planet Protector | 250 – 499 |
| Eco Champion | 500 – 999 |
| Campus Guardian | 1,000+ |

### Badges

| Badge | How to unlock |
|---|---|
| First Green Step | Complete your first challenge |
| Recycling Hero | Complete 5 recycling challenges |
| Water Saver | Complete 5 water challenges |
| Energy Guardian | Complete 5 energy-saving challenges |
| Three-Day Streak | Complete challenges on 3 consecutive days |
| Eco Champion | Reach 500 points |
| Campus Guardian | Reach 1,000 points |

### Challenges (max 175 points per day)

| Challenge | Difficulty | Points |
|---|---|---|
| Carry a Reusable Bottle | Easy | 20 |
| Recycle Paper or Plastic | Medium | 25 |
| Switch Off Unused Lights | Easy | 10 |
| Walk or Cycle on Campus | Medium | 20 |
| Bring Reusable Lunch Container | Easy | 15 |
| Avoid Single-Use Plastic | Medium | 20 |
| Use a Refill Station | Easy | 15 |
| Save Water While Washing | Easy | 10 |
| Bring a Reusable Shopping Bag | Easy | 15 |
| Pick Up & Dispose Litter | Hard | 25 |

## 🛠 Tech Stack

- React + Vite
- Tailwind CSS
- Lucide React (icons)
- Recharts (charts)
- Browser `localStorage` (persistence)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/greenpoints.git

# Go into the project
cd greenpoints

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

To create a production build:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
greenpoints/
├── public/
├── screenshots/
├── src/
│   ├── components/   # Sidebar, Header, StatCard, ChallengeCard, ProgressRing,
│   │                 # StreakCalendar, AchievementBadge, ImpactChart,
│   │                 # LeaderboardTable, ToastNotification, ConfirmationModal
│   ├── pages/        # Dashboard, Challenges, Achievements, CampusImpact,
│   │                 # Leaderboard, Profile
│   ├── data/         # sample challenges, badges, leaderboard, campus stats
│   ├── utils/        # points, levels, streaks, badges, date logic
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## ⚙️ How It Works

- **Points are awarded once:** each completion is stored per local calendar date, so repeated clicks or refreshes never give duplicate points.
- **Streaks are honest:** a day counts only when at least one challenge is completed, not just because the app was opened.
- **Daily reset:** challenges reset on a new local date, while lifetime points, badges, and history are kept.
- **Centralized logic:** points, level, streak, and badge calculations live in reusable utility functions.

## 🎨 Design System

| Color | Hex | Use |
|---|---|---|
| Forest Green | `#14532D` | Brand, headings, hero |
| Emerald | `#10B981` | Buttons, progress, success |
| Fresh Mint | `#D1FAE5` | Soft highlights |
| Cream White | `#FAFAF5` | Page background |
| Sage | `#E7EFE5` | Subtle cards |
| Charcoal | `#1F2937` | Primary text |
| Sunny Yellow | `#FBBF24` | Rewards and points |
| Soft Coral | `#FB7185` | Warnings and streak reminders |

## ♿ Accessibility

- Responsive layout for desktop, tablet, and mobile
- Semantic HTML, labeled controls, and visible focus states
- Completion is never shown by color alone
- Respects reduced-motion preferences
- Light and dark themes

## ⚠️ Demo Data Disclaimer

- Campus-wide statistics (bottles, recycled material, energy, total actions, active students) are **illustrative sample data**, not verified measurements.
- Leaderboard students are **fictional**.
- Your points, streaks, badges, and "Your Contribution" are calculated from your real activity in the app.
- Points do not directly measure carbon emissions saved.
- Daily reminders are a saved preference only; no real notifications are sent.

## 🗺 Roadmap

- [ ] Real authentication and cloud sync
- [ ] Department and team competitions
- [ ] Photo or QR challenge verification
- [ ] Admin dashboard for campus sustainability teams
- [ ] Real push notifications

---

<div align="center">

**🌱 Small actions, big impact. Let's make our campus greener, together.**

</div>
