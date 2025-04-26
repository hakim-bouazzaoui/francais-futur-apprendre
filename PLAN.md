# Plan: App Citoyenneté - React Native Application

## 1. Vision & Core Requirements

Develop an engaging iOS and Android mobile application to help users prepare for French naturalization. Key features include structured lessons, interactive quizzes, gamification mechanics (streaks, levels, badges, etc.), and intelligent revision prompts, all wrapped in a visually appealing French-themed interface.

## 2. Proposed Architecture & Technology Stack

```mermaid
graph TD
    subgraph "React Native App (Expo)"
        A[UI Layer] --> B(State Management);
        A --> C(Navigation);
        B --> D{Data Handling};
        C --> D;
        D --> E[Local Storage];
        D --> F[(Optional Backend)];
        A -- Uses --> G[UI Components];
        A -- Uses --> H[Animations];
    end

    A -- Built with --> React Native;
    B -- Implemented with --> Redux Toolkit / Zustand;
    C -- Implemented with --> React Navigation;
    E -- Implemented with --> AsyncStorage;
    F -- e.g. --> Firebase / Supabase;
    G -- e.g. --> React Native Paper / Elements;
    H -- e.g. --> Reanimated / Lottie;

    style F fill:#eee,stroke:#333,stroke-dasharray: 5 5
```

* **Framework:** **React Native** (using **Expo** is highly recommended).
* **Navigation:** **React Navigation** (Bottom Tab Navigator, Stack Navigator).
* **State Management:** **Zustand** (starting point, can migrate to Redux Toolkit if needed).
* **Local Storage:** **AsyncStorage**.
* **UI Components:** **React Native Paper** or **React Native Elements** (or NativeWind/Tamagui).
* **Animations:** **React Native Reanimated**, **Lottie**.
* **Backend (Optional):** **Firebase** or **Supabase**.

## 3. Key Feature Implementation Details

* **User Authentication (Optional - If Backend Used):** Email/Password, Social login.
* **Dashboard/Home Screen:** Greeting, streak, level/XP (post-MVP), continue lesson, daily quiz prompt (post-MVP).
* **Learning Modules:** Structured path/list, progress visualization, lock/unlock (post-MVP), lesson screen.
* **Interactive Activities:** Quizzes (MCQ, T/F), Flashcards (post-MVP), Mini-Games (post-MVP).
* **Gamification Mechanics (Post-MVP):** XP & Levels, Streaks (full implementation), Lives/Hearts, Virtual Currency, Badges, Leaderboards.
* **Intelligent Revision (SRS):** Track review dates/performance, schedule reviews, dedicated revision section.
* **User Profile:** Display user stats (SRS stats in MVP, broader stats post-MVP), collected badges (post-MVP), settings.

## 4. Visual Design Integration

* **Colors:** Apply French flag palette (`#0055A4`, `#FFFFFF`, `#EF4135`) via theming.
* **Typography:** Use `Montserrat` (headings) and `Open Sans` (body).
* **Iconography:** Use `react-native-vector-icons` and custom SVGs.
* **Theme:** Support Light and Dark modes.

## 5. Data Modeling (AsyncStorage / Optional Backend)

* Adapt structures from `extracted_webapp_logic.md`.
* Store user progress locally in AsyncStorage.
* Store lesson/quiz content: Bundle locally for MVP, consider backend later.

## 6. Proposed Project Structure (Expo)

```
/app-citoyennete/
|-- assets/             # Fonts, images, icons, lottie files
|   |-- fonts/
|   |-- images/
|   |-- icons/
|-- components/         # Reusable UI components
|   |-- common/
|   |-- gamification/
|   |-- learning/
|   |-- revision/       # SRS related components
|-- constants/          # Colors, styles, fixed values
|-- data/              # Bundled lesson/quiz content
|-- hooks/             # Custom React hooks
|-- lib/               # Utility functions, SRS logic
|-- navigation/        # React Navigation setup
|-- screens/           # Top-level screen components
|   |-- Auth/          # (Optional)
|   |-- Home/
|   |-- Lessons/
|   |-- Revision/
|   |-- Profile/
|   |-- Quiz/
|-- services/          # AsyncStorage wrapper, API calls (Optional)
|-- store/             # Zustand setup (if used)
|-- App.tsx            # Main entry point
|-- app.json           # Expo configuration
|-- babel.config.js
|-- package.json
|-- tsconfig.json
|-- extracted_webapp_logic.md
|-- PLAN.md            # This file
|-- README.md
```

## 7. Final Revised MVP Scope

1. **Setup:** Initialize React Native project with Expo, install core dependencies (Navigation, UI Lib, AsyncStorage).
2. **Core UI:** Implement basic navigation (Tabs), theme, and key screens (Home, Lessons List, Revision Screen, **Profile Screen**).
3. **Learning Module:** Implement module display and lesson viewing (using bundled mock data initially). Track completion status in AsyncStorage.
4. **Quiz System:** Implement basic MCQ quiz functionality. Track scores locally.
5. **Basic SRS Logic & Integration:**
   * Track key information for SRS locally (e.g., last review date, performance score) for quiz questions or specific lesson concepts within AsyncStorage.
   * Implement a simple algorithm to determine the next review date based on performance.
   * Display items due for review on the dedicated **Revision Screen**.
   * Display basic SRS-related statistics (e.g., number of items learned, items due for review) on the Profile Screen.
6. **Refinement:** Polish UI, fix bugs.

## 8. App Store Publication Requirements

For successful App Store submission:

1. **Privacy & Data Handling:**
   * Create comprehensive privacy policy
   * Document data collection and usage
   * Implement data deletion options

2. **App Store Assets:**
   * Create high-quality screenshots for different devices
   * Design engaging App Store listing
   * Prepare promotional text and keywords

3. **Technical Requirements:**
   * Implement crash reporting
   * Add analytics (optional)
   * Optimize performance
   * Test on multiple iOS devices

4. **Content Guidelines:**
   * Ensure all content is complete and functional
   * Verify no placeholder content remains
   * Test all features thoroughly
   * Implement proper error handling