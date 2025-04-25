import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SRSItem {
  id: string;
  moduleId: string;
  lessonTitle: string;
  question: string;
  nextReview: number; // timestamp
  interval: number; // days
  easeFactor: number; // multiplication factor for intervals
  consecutive: number; // number of consecutive correct answers
  lastReviewed?: number; // timestamp
}

const STORAGE_KEY = 'srs_items';

// Initial intervals in days
const INITIAL_INTERVAL = 1;
const MINIMUM_INTERVAL = 1;
const MINIMUM_EASE_FACTOR = 1.3;

// Ease factor adjustments
const EASE_BONUS = 0.1;
const EASE_PENALTY = 0.2;

export const addItemToSRS = async (
  moduleId: string,
  lessonTitle: string,
  question: string
): Promise<SRSItem> => {
  const item: SRSItem = {
    id: `${moduleId}-${Date.now()}`,
    moduleId,
    lessonTitle,
    question,
    nextReview: Date.now(),
    interval: INITIAL_INTERVAL,
    easeFactor: 2.5, // Standard initial ease factor
    consecutive: 0,
  };

  const items = await getSRSItems();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...items, item]));
  return item;
};

export const getSRSItems = async (): Promise<SRSItem[]> => {
  try {
    const items = await AsyncStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting SRS items:', error);
    return [];
  }
};

export const getDueItems = async (): Promise<SRSItem[]> => {
  const items = await getSRSItems();
  const now = Date.now();
  return items.filter(item => item.nextReview <= now);
};

export const updateItemInterval = async (
  itemId: string,
  wasCorrect: boolean
): Promise<void> => {
  const items = await getSRSItems();
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) return;

  const item = items[itemIndex];
  const now = Date.now();

  if (wasCorrect) {
    // Increase interval and ease factor for correct answers
    item.consecutive += 1;
    item.easeFactor = Math.max(
      MINIMUM_EASE_FACTOR,
      item.easeFactor + EASE_BONUS
    );
    
    // Calculate new interval based on SRS algorithm
    if (item.consecutive === 1) {
      item.interval = INITIAL_INTERVAL;
    } else if (item.consecutive === 2) {
      item.interval = 6;
    } else {
      item.interval = Math.round(item.interval * item.easeFactor);
    }
  } else {
    // Reset streak and decrease ease factor for incorrect answers
    item.consecutive = 0;
    item.easeFactor = Math.max(
      MINIMUM_EASE_FACTOR,
      item.easeFactor - EASE_PENALTY
    );
    item.interval = MINIMUM_INTERVAL;
  }

  // Calculate next review time
  item.nextReview = now + (item.interval * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  item.lastReviewed = now;

  // Update storage
  items[itemIndex] = item;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getItemStats = async (moduleId?: string): Promise<{
  totalItems: number;
  dueItems: number;
  masteredItems: number;
}> => {
  const items = await getSRSItems();
  const filteredItems = moduleId 
    ? items.filter(item => item.moduleId === moduleId)
    : items;

  const now = Date.now();
  
  return {
    totalItems: filteredItems.length,
    dueItems: filteredItems.filter(item => item.nextReview <= now).length,
    masteredItems: filteredItems.filter(item => item.consecutive >= 5).length,
  };
};

// Add questions from a completed quiz to the SRS system
export const addQuizQuestionsToSRS = async (
  moduleId: string,
  lessonTitle: string,
  questions: Array<{ question: string }>
): Promise<void> => {
  const existingItems = await getSRSItems();
  const newItems: SRSItem[] = questions.map(q => ({
    id: `${moduleId}-${Date.now()}-${Math.random()}`,
    moduleId,
    lessonTitle,
    question: q.question,
    nextReview: Date.now(),
    interval: INITIAL_INTERVAL,
    easeFactor: 2.5,
    consecutive: 0,
  }));

  // Filter out duplicates based on question text
  const uniqueNewItems = newItems.filter(
    newItem => !existingItems.some(
      existing => existing.question === newItem.question
    )
  );

  if (uniqueNewItems.length > 0) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existingItems, ...uniqueNewItems])
    );
  }
};

// Helper function to format next review time
export const getNextReviewText = (nextReview: number): string => {
  const now = Date.now();
  const diff = nextReview - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diff <= 0) return 'À réviser maintenant';
  if (days === 1) return 'À réviser demain';
  return `À réviser dans ${days} jours`;
};