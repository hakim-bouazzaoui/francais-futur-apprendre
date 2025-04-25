# Content Framework Integration Plan

This document outlines the framework for integrating different JSON files—such as QCM (Quiz), flashcards, lessons, etc.—into the application in a flexible manner without the need to update code every time new data is added.

---

## 1. Project Structure

- **Data Folder**:  
  Create a folder `data/json/` in the project root. This folder will contain all JSON files, for example, `history.json` for history content.

- **Optional Configuration File**:  
  Optionally, add a file like `data/contentConfig.json` that registers the available JSON files and provides metadata (e.g., content type, category, file path) to facilitate dynamic loading.

---

## 2. Define Unified Data Models

Create a new file (e.g., `models/ContentTypes.ts`) with interfaces for each content type. For example:

```typescript
// models/ContentTypes.ts

export interface Flashcard {
  id: string;
  category: string;
  type: "Flashcard";
  tags: string[];
  front: string;
  back: string;
  difficulty: number;
  notes?: string;
}

export interface Quiz {
  id: string;
  category: string;
  type: "Quiz";
  tags: string[];
  question: string;
  answer: string;
  options?: { text: string; isCorrect: boolean }[];
  difficulty: number;
  notes?: string;
}

export interface Lesson {
  id: string;
  category: string;
  type: "Lesson";
  tags: string[];
  title: string;
  key_points: string[];
  difficulty: number;
  notes?: string;
}

export interface Term {
  id: string;
  category: string;
  type: "Term";
  tags: string[];
  term: string;
  definition: string;
  difficulty: number;
  notes?: string;
}

// Union type for all content items
export type ContentItem = Flashcard | Quiz | Lesson | Term;
```

---

## 3. Build a Content Manager Service

Create a service (e.g., `services/contentManager.ts`) to:

- Dynamically load JSON files from `data/json/`
- Validate the data using the defined interfaces (TypeScript helps during development; you may use a runtime validation library like `zod` or `io-ts` for stricter validation)
- Combine or index the content items for easy access

Example snippet:

```typescript
// services/contentManager.ts

import { ContentItem } from '../models/ContentTypes';
import historyData from '../data/json/history.json';

export const getContentItems = (): ContentItem[] => {
  // For now, combine a single JSON file
  // Later, you could loop through all JSON files defined in a config
  return historyData as ContentItem[];
};
```

*Note: To streamline bundling and avoid dynamic import issues with JSON, you can import the JSON statically.*

---

## 4. Dynamic Content Renderer

Implement a component (`components/ContentRenderer.tsx`) that:
- Takes a `ContentItem` as a prop
- Uses a registry to map the `type` field to a specific component:
  - `FlashcardComponent` for type "Flashcard"
  - `QuizComponent` for type "Quiz"
  - `LessonComponent` for type "Lesson"
  - `TermComponent` for type "Term"

Example registry snippet:

```tsx
// components/ContentRenderer.tsx

import React from 'react';
import { ContentItem } from '../models/ContentTypes';
import FlashcardComponent from './FlashcardComponent';
import QuizComponent from './QuizComponent';
import LessonComponent from './LessonComponent';
import TermComponent from './TermComponent';

interface ContentRendererProps {
  item: ContentItem;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ item }) => {
  switch(item.type) {
    case 'Flashcard':
      return <FlashcardComponent item={item} />;
    case 'Quiz':
      return <QuizComponent item={item} />;
    case 'Lesson':
      return <LessonComponent item={item} />;
    case 'Term':
      return <TermComponent item={item} />;
    default:
      return null;
  }
};

export default ContentRenderer;
```

Create basic stub components for each type, e.g.,
```tsx
// components/FlashcardComponent.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flashcard } from '../models/ContentTypes';

interface FlashcardComponentProps {
  item: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.front}>{item.front}</Text>
    <Text style={styles.back}>{item.back}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  front: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    marginTop: 8,
    fontSize: 16,
  }
});

export default FlashcardComponent;
```
Implement similar stub components for Quiz, Lesson, and Term.

---

## 5. Integration into the App

- **Content List Screen**:  
  Create a new screen (e.g., `screens/ContentListScreen.tsx`) that:
  - Uses the content manager service to fetch all content items.
  - Renders a list (or grid) of these items.
  - On selecting an item, navigates to a detail screen that uses `ContentRenderer` to display the item.

- **Navigation Update**:  
  Update your `RootNavigator` (or an appropriate navigator) to include the new Content List Screen and the Content Detail Screen.

---

## 6. Testing and Validation

- **Unit Tests**:  
  Write unit tests for the content manager service to ensure JSON files are loaded and validated correctly.

- **Component Testing**:  
  Validate that each specialized component renders correctly with sample data.

- **Dynamic Loading**:  
  Test by adding new JSON data into the `data/json/` folder and verify it appears correctly in the Content List Screen without code changes.

---

## Recap

This framework provides:
- A **flexible data storage** approach using JSON files.
- **Unified data models** for various content types.
- A **content manager service** to integrate and validate JSON data.
- A **dynamic renderer** that maps the data to appropriate UI components.
- **Seamless integration** into the app with minimal code changes required when new content is added.

---

Feel free to review this plan. If it meets your requirements, we can proceed to implement the components and services accordingly.