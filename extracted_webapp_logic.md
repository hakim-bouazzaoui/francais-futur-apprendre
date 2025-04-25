# Extracted Information from Web Application

This document summarizes key design elements and logic/data structures extracted from the existing React web application (`francais-futur-apprendre`) to inform the development of the React Native mobile application.

## Design Elements

*   **Color Palette (Based on French Flag):**
    *   **Blue:** `#0055A4` (also defined as `--primary: hsl(210 79% 33%)`) - Used for primary elements, backgrounds.
    *   **White:** `#FFFFFF` (also defined as `--background/--card: hsl(0 0% 100%)` in light mode) - Used for content areas, cards.
    *   **Red:** `#EF4135` (also defined as `--accent: hsl(4 71% 58%)`) - Used for accents, buttons, notifications.
*   **Theming:** Uses CSS variables for defining colors, supporting light and dark modes (`src/index.css`).
*   **Typography:**
    *   **Headings:** Montserrat (Bold)
    *   **Body:** Open Sans
*   **UI Components:** Leverages Shadcn UI components (`src/components/ui/`) built on Tailwind CSS.
*   **Layout:** Uses Tailwind CSS for utility-first styling and layout. Includes a main content area and a bottom navigation bar (`Navbar` component).

## Logic and Data Structures

*   **Framework:** React with TypeScript and Vite.
*   **Routing:** `react-router-dom` used for page navigation (`/`, `/lessons`, `/leaderboard`, `/profile`, `/module/:id`). (Equivalent in RN: `React Navigation`).
*   **State Management:**
    *   `@tanstack/react-query` used for managing server state/data fetching.
    *   Component-level state (`useState`, `useEffect`) for UI logic (e.g., greeting).
*   **Core Features Implemented (or mocked):**
    *   **Dashboard (`Index.tsx`):** Displays greeting, user level, streak, progress bar, learning modules, daily quiz prompt.
    *   **Learning Modules (`LearningModule.tsx`, `mock-data.ts`):** Displays modules with title, description, progress. Data is currently mocked.
    *   **Gamification Elements (`Index.tsx`, `mock-data.ts`):**
        *   Levels (`userStats.level`)
        *   Streaks (`streakData`)
        *   XP/Progress (`userStats.totalXP`, progress bar logic)
        *   Badges (structure defined in `mock-data.ts`, likely displayed on Profile page).
        *   Quizzes (structure defined in `mock-data.ts`, daily quiz prompt on Index).
    *   **Navigation:** Bottom `Navbar` component likely handles switching between main sections.
*   **Data Structures (`src/lib/mock-data.ts`):**
    *   **`LearningModuleProps`:** `id`, `title`, `description`, `completedLessons`, `totalLessons`, `category`, `isLocked`
    *   **`Badge`:** `id`, `name`, `description`, `icon`, `achieved`, `progress?`, `maxProgress?`
    *   **`QuizQuestion`:** `id`, `moduleId`, `question`, `options`, `correctAnswer`, `explanation`
    *   **`Lesson`:** `id`, `title`, `content` (grouped by module ID)
    *   **`StreakData`:** `current`, `longest`, `thisWeek` (array)
    *   **`UserStats`:** `totalXP`, `level`, `daysActive`, `questionsAnswered`, `correctAnswers`, `accuracy`

This extracted information provides a solid foundation for planning the React Native application's features, UI, and data handling.