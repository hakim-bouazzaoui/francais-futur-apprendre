import AsyncStorage from '@react-native-async-storage/async-storage';
import { SRSItem } from './srs';

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export const printSRSItems = async () => {
  try {
    const items = await AsyncStorage.getItem('srs_items');
    console.log('SRS Items:', items ? JSON.parse(items) : 'No items found');
  } catch (error) {
    console.error('Error printing SRS items:', error);
  }
};

export const addTestItems = async () => {
  const now = Date.now();
  const testItems: SRSItem[] = [
    {
      id: 'test-1',
      moduleId: 'history',
      lessonTitle: 'La Révolution française',
      question: 'En quelle année a débuté la Révolution française ?',
      nextReview: now - 1000, // Due now
      interval: 1,
      easeFactor: 2.5,
      consecutive: 0,
    },
    {
      id: 'test-2',
      moduleId: 'history',
      lessonTitle: 'La Révolution française',
      question: 'Quel événement marque le début de la Révolution ?',
      nextReview: now + (24 * 60 * 60 * 1000), // Due tomorrow
      interval: 1,
      easeFactor: 2.5,
      consecutive: 1,
    },
    {
      id: 'test-3',
      moduleId: 'history',
      lessonTitle: 'La Révolution française',
      question: 'Quelle déclaration a été adoptée en août 1789 ?',
      nextReview: now - (2 * 60 * 60 * 1000), // Due 2 hours ago
      interval: 1,
      easeFactor: 2.5,
      consecutive: 0,
    }
  ];

  try {
    await AsyncStorage.setItem('srs_items', JSON.stringify(testItems));
    console.log('Test items added');
  } catch (error) {
    console.error('Error adding test items:', error);
  }
};