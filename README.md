# 🌱 EcoQuest — Campus Sustainability & Habit Gamification Platform

> **"Small Actions. Greener Campuses. Bigger Impact."**

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Sustainable Color Palette & Design System](#-sustainable-color-palette--design-system)
4. [Dependencies & Requirements](#-dependencies--requirements)
5. [Prerequisites: Installing Node.js & npm](#-prerequisites-installing-nodejs--npm)
6. [Getting Started & Installation](#-getting-started--installation)
7. [Available Scripts](#-available-scripts)
8. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
9. [Gamification & Tier Logic](#-gamification--tier-logic)
10. [Troubleshooting & FAQ](#-troubleshooting--faq)
11. [License](#-license)

---

## 📖 Overview

**EcoQuest** is a premium, gamified web application engineered for college students and academic institutions to transform everyday sustainable habits into measurable climate action. Built for collegiate innovation challenges and hackathons, EcoQuest addresses a fundamental issue: **students want to protect the environment, but lack an intuitive starting point, immediate positive reinforcement, and visibility into collective campus impact.**

Through micro-habits, streaks, tier progression, interactive 3D physics, dynamic badges, and real-time campus data visualization, EcoQuest makes sustainability competitive, collaborative, and rewarding.

---

## ✨ Key Features

### 1. 🎯 Interactive Daily Challenges Board
* **Actionable Micro-Tasks**: 10 realistic campus challenges (carrying reusable bottles, power conservation, safe campus litter cleanup, sustainable transit, etc.).
* **Multi-Category Filters**: Instant filtering by *All, Recycling, Energy, Water, Transport,* and *Reusable Products*.
* **Live Search**: Real-time client-side search to locate tasks instantly.
* **Instant Feedback & Anti-Duplication**: One-click completion with point awards, undo safety, celebration particle confetti, and protection against duplicate rewards.
* **Automated Calendar Daily Reset**: Automatically refreshes daily challenges at local midnight while preserving lifetime EcoPoints, streak days, and unlocked achievements.

### 2. ⚡ Gamification & Tier Progression
* **5 Distinct Eco Ranks**:
  | Rank | Points Required | Badge Title |
  | :--- | :--- | :--- |
  | **Eco Rookie** | 0 – 99 pts | 🍃 Beginner |
  | **Green Explorer** | 100 – 249 pts | 🌿 Active Adventurer |
  | **Planet Protector** | 250 – 499 pts | 🛡️ Campus Guardian |
  | **Eco Champion** | 500 – 999 pts | 🌟 Sustainability Leader |
  | **Campus Guardian** | 1,000+ pts | 👑 Master Environmentalist |
* **Milestone Progress Rings**: Animated SVG circular progress rings tracking completion velocity and remaining points to the next tier.
* **Verified Daily Streaks**: 7-day visual calendar tracking consecutive active days based on verified completed challenges.

### 3. 🏆 Achievement Badges & Celebration FX
* **Unlockable Milestones**:
  * 🥇 *First Green Step* — Complete your first campus challenge.
  * ♻️ *Recycling Hero* — Complete 5 recycling-specific challenges.
  * 💧 *Water Saver* — Complete 5 water conservation actions.
  * 💡 *Energy Guardian* — Complete 5 energy-saving actions.
  * 🔥 *Three-Day Streak* — Maintain continuous activity for 3 days.
  * 🌟 *Eco Champion* — Surpass 500 lifetime EcoPoints.
  * 👑 *Campus Guardian* — Surpass 1,000 lifetime EcoPoints.
* **3D Particle Celebrations**: Interactive confetti and floating point burst upon unlocking badges or finishing daily goals.

### 4. 📊 Campus Impact Dashboard & Visualizations
* **Campus-Wide Metrics**: Illustrative aggregate counters showcasing bottles diverted, kg of materials recycled, kWh of energy saved, and total verified actions.
* **Interactive Recharts Visuals**: Responsive weekly sustainability activity graphs and category breakdown bars.
* **Collective Goal Tracking**: Campus-wide progress meter motivating the student body to reach collective milestones together.
* **Personal Contribution Breakdown**: Clear distinction between personal impact metrics and aggregate campus statistics.

### 5. 🥇 Real-Time Leaderboard
* **Podium Recognition**: Gold (🥇), Silver (🥈), and Bronze (🥉) distinction for top campus leaders.
* **Dual Timeframes**: Filter rankings by **Weekly** or **All-Time** performance.
* **Self-Highlight**: Persistent user highlight card showing current rank, avatar, and distance to higher positions.

### 6. 👤 User Profile & Customization
* **Editable Identity**: Real-time display name and avatar customizer.
* **Activity Audit Trail**: History log detailing timestamped completions and points earned.
* **Theme Modes**: Full support for Nature Cream Light Theme and Forest Dark Theme.
* **Accessibility Settings**: Reduced motion mode and persistent local notification controls.
* **Safe State Reset**: One-click demo data reset dialog with verification prompt.

---

## 🎨 Sustainable Color Palette & Design System

The visual identity is inspired by nature, modern climate-tech startups, and clean productivity applications:

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Forest Green** | `#14532D` | Primary brand color, headings, hero containers |
| **Emerald** | `#10B981` | Action buttons, active states, progress indicators |
| **Fresh Mint** | `#D1FAE5` | Soft badges, completed task cards, highlights |
| **Cream White** | `#FAFAF5` | Primary warm natural background |
| **Sage** | `#E7EFE5` | Card backgrounds, pill borders, secondary surfaces |
| **Sunny Yellow** | `#FBBF24` | EcoPoints, achievement badges, rewards |
| **Soft Coral** | `#FB7185` | Streak indicators, warnings, undo buttons |
| **Charcoal** | `#1F2937` | High-contrast body typography |

---

## 📦 Dependencies & Requirements

This project uses modern, production-grade packages managed through `npm`. Below is the complete breakdown of runtime and development dependencies:

### 🚀 Production Dependencies (Runtime)
These packages are bundled into the application and execute in the user's browser:

| Package | Version | Purpose |
| :--- | :--- | :--- |
| [`react`](https://www.npmjs.com/package/react) | `^19.3.1` | Core UI library for component architecture and reactive state management |
| [`react-dom`](https://www.npmjs.com/package/react-dom) | `^19.3.1` | DOM renderer for React components |
| [`lucide-react`](https://www.npmjs.com/package/lucide-react) | `^1.61.0` | High-performance, consistent SVG icon set for sustainability categories |
| [`recharts`](https://www.npmjs.com/package/recharts) | `^3.10.1` | Declarative charting library for rendering campus weekly activity and metrics |

### 🛠️ Developer & Build Tooling (DevDependencies)
These tools compile, bundle, and optimize the code during development and build time:

| Package | Version | Purpose |
| :--- | :--- | :--- |
| [`vite`](https://www.npmjs.com/package/vite) | `^8.3.4` | Next-generation bundler delivering near-instant Hot Module Replacement (HMR) |
| [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react) | `^6.1.2` | Official React plugin for Vite with Fast Refresh support |
| [`tailwindcss`](https://www.npmjs.com/package/tailwindcss) | `^4.3.3` | Utility-first CSS framework (v4 engine) for high-performance styling |
| [`@tailwindcss/vite`](https://www.npmjs.com/package/@tailwindcss/vite) | `^4.3.3` | Native Vite integration plugin for Tailwind CSS v4 |
| [`typescript`](https://www.npmjs.com/package/typescript) | `~6.0.3` | Static type checker for strict type safety and developer productivity |
| [`oxlint`](https://www.npmjs.com/package/oxlint) | `^1.88.0` | Ultra-fast Rust-based JavaScript & TypeScript linter |
| [`@types/react`](https://www.npmjs.com/package/@types/react) | `^19.3.0` | TypeScript definitions for React |
| [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) | `^19.3.0` | TypeScript definitions for React DOM |
| [`@types/node`](https://www.npmjs.com/package/@types/node) | `^24.19.2` | TypeScript definitions for Node.js environments |

---

## 💻 Prerequisites: Installing Node.js & npm

Before running this project, you must have **Node.js** (which includes **npm**, the Node Package Manager) installed on your system.

* **Minimum Required Version**: Node.js `18.0.0` or higher
* **Recommended Version**: Node.js `20.x` or `22.x` (Active LTS)

### 📥 How to Install Node.js & npm

#### Option 1: Official Installer (Recommended for Beginners)
1. Visit the official download page: [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** installer for your operating system (Windows, macOS, or Linux).
3. Run the installer and follow the wizard instructions (keep default settings checked).
4. Restart your terminal or command prompt after the installation completes.

#### Option 2: Using a Package Manager

* **Windows (via winget or Chocolatey):**
  ```powershell
  # Using Windows Package Manager
  winget install OpenJS.NodeJS.LTS

  # Or using Chocolatey
  choco install nodejs-lts
  ```

* **macOS (via Homebrew):**
  ```bash
  # Install Homebrew if not already installed, then:
  brew install node
  ```

* **Linux (Ubuntu / Debian via NodeSource):**
  ```bash
  # Using NodeSource for Node.js 20 LTS
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

* **Cross-Platform via NVM (Node Version Manager):**
  ```bash
  # Install NVM, then install the latest LTS version:
  nvm install --lts
  nvm use --lts
  ```

### 🔍 Verify Installation
Open your terminal (PowerShell, Command Prompt, or Bash) and execute:

```bash
node --version
# Should output: v18.x.x, v20.x.x, or higher

npm --version
# Should output: 9.x.x, 10.x.x, or higher
```

If both commands return a version number, your environment is ready!

---

## 🚀 Getting Started & Installation

Follow these steps to clone, configure, and launch the application on your computer:

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/ecoquest.git
cd ecoquest
```

### Step 2: Install Project Dependencies
Run `npm install` inside the project folder to download all required packages into `node_modules`:

```bash
npm install
```
> **Tip:** If you need an exact, reproducible installation matching `package-lock.json`, you can run `npm ci` instead.

### Step 3: Start the Development Server
Launch the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Once started, the terminal will display the live local and network URLs:
```text
  VITE v8.3.5  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
  ➜  press h + enter to show help
```

Open your browser and navigate to **`http://localhost:5173/`**. Any code edits you make will reflect instantly in the browser without reloading the page.

---

## 📜 Available Scripts

In the project directory, you can run the following npm commands:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server on `http://localhost:5173` with instant HMR |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and bundles production assets with Vite into `dist/` |
| `npm run preview` | Locally serves the production build from `dist/` to verify performance before deploying |
| `npm run lint` | Runs `oxlint` to quickly analyze TypeScript and React code for errors and anti-patterns |

---

## 📂 Project Architecture & Directory Structure

```text
greenpoints/
├── public/
│   ├── earth-globe.jpg        # High-res Earth globe graphic
│   ├── earth-hand.jpg         # Hands holding earth graphic
│   ├── favicon.svg            # Self-contained SVG with inline Base64 data URI
│   └── icons.svg              # Category vector icons
├── src/
│   ├── assets/                # Bundled images & graphics
│   │   ├── earth-globe.jpg    # Direct bundled logo asset
│   │   └── earth-hand.jpg     # Direct bundled impact asset
│   ├── components/
│   │   ├── Card3D.tsx             # Interactive 3D tilt card wrapper
│   │   ├── CelebrationEffects.tsx  # Particle canvas burst engine
│   │   ├── ChallengeCard.tsx      # Challenge card with verification & undo
│   │   ├── Header.tsx             # Sticky navigation header & notifications
│   │   ├── MobileBottomNav.tsx    # Floating responsive mobile dock
│   │   ├── ProgressRing.tsx       # Animated SVG circular gauge
│   │   ├── Sidebar.tsx            # Desktop drawer with brand logo & nav
│   │   ├── StatCard.tsx           # 3D interactive statistics card
│   │   └── Toast.tsx              # Toast notification system
│   ├── pages/
│   │   ├── Dashboard.tsx          # Main hub: hero, stats, daily tasks, streak
│   │   ├── Challenges.tsx         # Filterable challenge board
│   │   ├── Achievements.tsx       # Tier progression & badge unlocks
│   │   ├── Impact.tsx             # Campus-wide analytics & Recharts
│   │   ├── Leaderboard.tsx        # Student rankings & podium
│   │   └── Profile.tsx            # Settings, audit log, theme toggle
│   ├── App.tsx                    # Page router & layout orchestration
│   ├── AppContext.tsx             # State provider & custom dispatchers
│   ├── data.ts                    # Challenges, levels, badges & demo data
│   ├── store.ts                   # LocalStorage sync, streak & daily reset logic
│   ├── types.ts                   # Strict TypeScript type definitions
│   ├── index.css                  # Tailwind CSS v4 custom theme & utility classes
│   └── main.tsx                   # Vite entrypoint
├── dist/                          # Production build output
├── package.json                   # Dependencies, scripts & metadata
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite bundler plugins & settings
```

---

## 🧠 Gamification & Tier Logic

* **Point Calculation**: Each challenge awards between `10` and `25` EcoPoints depending on difficulty (Easy, Medium, Hard).
* **Anti-Cheat Validation**: A challenge can only be completed once per calendar date. Points are awarded exactly once.
* **Daily Reset**: When the calendar date advances past `lastResetDate`, the completed state for daily challenges resets, while lifetime EcoPoints, streak days, and unlocked achievements are permanently preserved.
* **True Streak Verification**: Streaks require at least one verified challenge completed on consecutive calendar days.
* **Storage Persistence**: All progress is automatically synchronized to the browser's `localStorage` under `ecoquest-state` with automatic backwards compatibility for previous sessions.

---

## ❓ Troubleshooting & FAQ

#### 1. Port 5173 is already in use
If another application is using port 5173, Vite can automatically use another port, or you can specify one:
```bash
npm run dev -- --port 3000
```

#### 2. EACCES or Permission Errors during `npm install`
On macOS or Linux, do not use `sudo npm install`. Instead, fix npm permissions:
```bash
# Recommended: Reinstall node via NVM or change npm default directory:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

#### 3. Corrupt `node_modules` or Build Errors
To perform a fresh clean install:
```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules, package-lock.json; npm install

# macOS / Linux
rm -rf node_modules package-lock.json && npm install
```

---

## 📄 License

This project is open-source and distributed under the **[MIT License](LICENSE)**. You are free to modify, deploy, and adapt it for collegiate competitions, hackathons, or campus sustainability programs.

---

<p align="center">
  Made with 💚 for a cleaner, greener campus future.
</p>
