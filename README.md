# EcoEscuela

A gamified web application designed to encourage students to adopt eco-friendly habits by turning environmental care into a fun, engaging game. Built for a school programming class project addressing the real-world problem of low student engagement in environmental initiatives.

## The Problem

Many students want to help the environment but lack motivation or don't know where to start. Traditional awareness campaigns often fail to create lasting behavioral change because they feel like chores rather than meaningful activities.

## The Solution

EcoEscuela transforms environmental actions into weekly challenges with a gamification system featuring points, badges, streaks, and class-wide competition. By making sustainability social and rewarding, students are motivated to participate consistently.

## Features

### Weekly Challenges
Complete 5 ecological challenges each week:
- **Recicla correctamente** - Separate waste 5 days a week
- **Ahorra agua** - Turn off the tap while brushing your teeth for 7 days
- **Transporte sostenible** - Walk or bike to school 3 times
- **Sin plastico de un solo uso** - Use reusable bags all week
- **Plantar vida** - Care for a plant or participate in reforestation

Each challenge tracks individual progress and awards **50 points + a unique badge** upon completion.

### Gamification
- **Points system** - Earn points for every completed challenge
- **8 achievement badges** - Collect unique badges like "Reciclador Pro," "Guardian del Agua," and "Lider Verde"
- **Streak tracking** - Build a daily participation streak
- **Level progression** - Level up as you accumulate points

### Community & Competition
- **Class groups** - Join your class group and contribute to a collective monthly goal
- **Class rankings** - See where you stand compared to classmates
- **Group leaderboard** - Compete against other classes for the highest group score

### Statistics Dashboard
- Weekly and monthly point charts (bar and line graphs)
- Completed challenges breakdown by day
- General ranking of top students
- Group progress comparison

### User Profile
- Personal stats overview (completed challenges, streak, total points)
- Badge collection grid with earned dates
- Level progress bar showing points needed for next level

### Settings
- User account information display
- Language preference (Spanish, English, French)
- Separate notification toggles for challenges and achievements
- Support sections (placeholder for future expansion)

## Tech Stack

- **React 18** + **TypeScript** - Frontend framework
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Recharts** - Data visualization (charts and graphs)
- **Radix UI** - Accessible headless UI primitives
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence (no backend required)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

The app runs as a mobile-first responsive web application. Open it in a browser and resize to a mobile viewport for the best experience.

## How It Works

1. **Sign up** with your name, username, and email
2. **Browse challenges** from the main menu
3. **Register progress** by clicking "Registrar" on each challenge
4. **Earn badges** when you complete a challenge (current + target)
5. **Compete** with classmates on the leaderboard
6. **Track your stats** on the statistics dashboard
7. **View your profile** to see your badge collection and level progress

All data is stored locally in the browser using LocalStorage, so each user has their own independent progress.

## Project Structure

```
src/
  app/
    components/
      LoginScreen.tsx         # Login / Sign-up screen
      MainMenu.tsx            # Main navigation menu
      WeeklyChallenges.tsx    # Weekly ecological challenges
      UserProfile.tsx         # User profile with badges
      Statistics.tsx          # Charts, rankings, group progress
      Community.tsx           # Class groups and competition
      Settings.tsx            # App settings
    services/
      storageService.ts       # LocalStorage data management
    App.tsx                   # Main app with screen routing
```

## Author

Built as a school project for a programming class, addressing the real-world problem of student disengagement from environmental causes.
