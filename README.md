GreenPoints 🌱
Small Actions. Greener Campuses. Bigger Impact.

GreenPoints is a responsive, gamified sustainability web app designed to encourage college students to build everyday eco-friendly habits. Students choose small challenges, record completed actions, earn GreenPoints, maintain streaks, and unlock achievement badges.
Project status: This is a self-contained front-end demo for a college project or hackathon. Campus-wide statistics and other students on the leaderboard are illustrative sample data, not verified real-world measurements.

The Problem
Many students want to help the environment but may not know where to start or how to stay consistent. GreenPoints makes sustainability feel approachable by turning small actions—such as recycling, saving water, and carrying reusable items—into simple daily challenges.
The Solution
Students can use GreenPoints to:
- Complete a daily checklist of sustainability challenges.
- Earn points for each challenge, with protection against claiming the same reward twice in one local calendar day.
- Track daily progress, active days, current streaks, and longest streaks.
- Unlock badges and progress through eco-levels.
- View personal activity and sample campus impact statistics.
- Compare their score with fictional demo students on weekly and all-time leaderboards.
- Personalize the app with a display name, theme, reminder preference, and reduced-motion setting.
Features
1. Dashboard
Provides a personalized greeting, today's progress ring, lifetime points, challenge completion count, streak, eco-level, daily checklist, recent badges, and seven-day activity calendar.
2. Daily Challenges
Includes 10 sample challenges with point rewards, descriptions, categories, and difficulty labels. Users can search by name or description and filter by category.
Challenge	Points
Carry a reusable water bottle	20
Recycle paper or plastic correctly	25
Switch off unused lights	10
Walk or cycle a campus trip	20
Bring a reusable lunch container	15
Avoid single-use plastic today	20
Use a refill station	15
Save water while washing	10
Bring a reusable shopping bag	15
Pick up litter safely	25


Completing a challenge updates the point total and other relevant metrics immediately. A completion can be undone for the current day, but the same challenge reward remains unavailable until the next local calendar day.
3. Achievements and Eco-levels
Badge eligibility is calculated from recorded demo activity.
- First Green Step: complete at least one challenge.
- Recycling Hero: complete five recycling actions.
- Water Saver: complete five water-conservation actions.
- Energy Guardian: complete five energy-saving actions.
- Three-Day Streak: have activity on three consecutive calendar days.
- Eco Champion: earn 500 lifetime points.
- Campus Guardian: earn 1,000 lifetime points.
Eco-levels are based on lifetime GreenPoints: Eco Rookie, Green Explorer, Planet Protector, Eco Champion, and Campus Guardian.
4. Campus Impact
Shows illustrative sample figures for reusable bottles, recyclables, energy conservation, weekly activity, and a campus action goal. It also reports a user's personal challenge activity based on local demo records.

GreenPoints are motivational scores, not carbon-emissions measurements. The demo does not claim that points directly equal environmental savings.
5. Leaderboard
Displays weekly and all-time rankings using fictional student profiles and the current demo user's score. The sample data is for presentation purposes and does not represent actual students.
6. Profile and Preferences
Users can edit their display name, view recent completed challenges, switch between light and dark themes, save a local reminder preference, enable reduced motion, and reset the demo after confirming.

The reminder preference is stored locally only; this demo does not send push notifications or scheduled reminders.
Tech Stack
- HTML5 for the app structure
- CSS3 for responsive layout, visual styling, themes, and animations
- Vanilla JavaScript for navigation, point calculations, filtering, streaks, badges, and interactions
- Browser localStorage for saving demo progress and preferences on the same browser and device
- Inline SVG for lightweight icons and the progress ring
The prototype is a single self-contained HTML file and does not require a framework, package installation, API key, or backend server.
Getting Started
Option 1: Open the file directly
1. Download or copy the project file index.html into a folder.
2. Open index.html in a modern browser.
3. Start by exploring the Dashboard, then open Daily Challenges and complete a task.
Option 2: Use Visual Studio Code
1. Open the project folder in Visual Studio Code.
2. Open index.html.
3. Run it with a local preview extension such as Live Server, or open the file directly in your browser.
No build command or dependency installation is required.
How to Use the App
1. Open the Dashboard to review the current demo progress.
2. Select Daily Challenges.
3. Use the search box or category filters to find a task.
4. Complete the real-world activity, then click Complete in the demo.
5. Review the updated points, streak, level, and achievement eligibility.
6. Visit Campus Impact, Leaderboard, or Profile to explore the other sections.
7. To start the demo over, open Profile → Reset demo and confirm the action.
Data and Privacy Notes
- Progress is saved in browser localStorage under the key greenpoints-demo-v1.
- Saved state is local to the browser profile and device. It does not sync between students or devices.
- Clearing browser storage may remove the locally saved demo progress.
- The app does not include user accounts, authentication, a shared database, or server-side verification.
- Challenge completion is self-reported in this prototype; it is not independently verified.
- Campus impact figures and other students' leaderboard scores are sample values.
- No real notifications are sent.
Limitations and Future Improvements
Possible next steps for a production version include:
- Add student sign-in and a secure shared database.
- Connect verified campus recycling, energy, and sustainability data.
- Create real campus groups and a leaderboard based on participating students.
- Add optional evidence or event-based verification for selected challenges.
- Build genuine reminder delivery with user consent.
- Add administrative tools and configurable challenge schedules.
- Conduct accessibility, security, and cross-browser testing before deployment.
Project Goal
GreenPoints aims to make sustainability easier to start and easier to maintain by celebrating small, repeatable actions. When many students take part, those habits can help build a greener campus culture.

Small Actions. Greener Campuses. Bigger Impact.
