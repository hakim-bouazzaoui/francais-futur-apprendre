import { contentRegistry } from '../contentRegistry';
import { dataSync, CONTENT_EVENTS } from '../dataSync';
import { ContentItem } from '../../models/ContentTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Helper class to simulate and verify content changes
 */
export class ContentTestHelper {
  private static listeningToEvents = false;
  private static eventLog: Array<{ event: string; data: any }> = [];

  /**
   * Start listening to content events
   */
  static startListening() {
    if (this.listeningToEvents) return;

    Object.values(CONTENT_EVENTS).forEach(event => {
      dataSync.subscribe(event, (data: any) => {
        this.eventLog.push({ event, data });
        console.log(`Content Event: ${event}`, data);
      });
    });

    this.listeningToEvents = true;
  }

  /**
   * Clear event log
   */
  static clearEventLog() {
    this.eventLog = [];
  }

  /**
   * Get recorded events
   */
  static getEvents() {
    return [...this.eventLog];
  }

  /**
   * Clear all content cache
   */
  static async clearCache() {
    await AsyncStorage.clear();
  }

  /**
   * Simulate adding new content
   */
  static async simulateNewContent(content: ContentItem) {
    // Add content to registry
    const currentContent = contentRegistry.getContent();
    const newContent = [...currentContent, content];
    
    // Force refresh to trigger sync
    await dataSync.forceRefresh();

    return this.getEvents();
  }

  /**
   * Simulate content changes
   */
  static async simulateContentChanges() {
    const changes = {
      added: 0,
      modified: 0,
      categories: new Set<string>(),
      types: new Set<string>()
    };

    // New Quiz
    const newQuiz: ContentItem = {
      id: `TEST_${Date.now()}`,
      category: "Test Category",
      type: "Quiz",
      tags: ["test"],
      question: "Test Question?",
      answer: "Test Answer",
      options: [
        { text: "Wrong", isCorrect: false },
        { text: "Test Answer", isCorrect: true }
      ],
      difficulty: 1
    };

    // New Flashcard in new category
    const newFlashcard: ContentItem = {
      id: `TEST_${Date.now() + 1}`,
      category: "New Category",
      type: "Flashcard",
      tags: ["test"],
      front: "Test Front",
      back: "Test Back",
      difficulty: 1
    };

    // Add content
    await this.simulateNewContent(newQuiz);
    changes.added++;
    changes.categories.add(newQuiz.category);
    changes.types.add(newQuiz.type);

    await this.simulateNewContent(newFlashcard);
    changes.added++;
    changes.categories.add(newFlashcard.category);
    changes.types.add(newFlashcard.type);

    return {
      changes,
      events: this.getEvents()
    };
  }

  /**
   * Verify content integrity
   */
  static async verifyContentIntegrity() {
    const content = contentRegistry.getContent();
    const categories = contentRegistry.getCategories();
    const types = contentRegistry.getTypes();

    // Check category consistency
    const contentCategories = new Set(content.map(item => item.category));
    const registeredCategories = new Set(categories);
    const categoriesMatch = [...contentCategories].every(cat => registeredCategories.has(cat));

    // Check type consistency
    const contentTypes = new Set(content.map(item => item.type));
    const registeredTypes = new Set(types);
    const typesMatch = [...contentTypes].every(type => registeredTypes.has(type));

    return {
      contentCount: content.length,
      categoriesCount: categories.length,
      typesCount: types.length,
      isConsistent: categoriesMatch && typesMatch,
      categories: Array.from(contentCategories),
      types: Array.from(contentTypes)
    };
  }

  /**
   * Print content analysis
   */
  static async printContentAnalysis() {
    const integrity = await this.verifyContentIntegrity();
    
    console.log('\n=== Content Analysis ===');
    console.log(`Total Items: ${integrity.contentCount}`);
    console.log(`Categories: ${integrity.categoriesCount}`);
    console.log(`Types: ${integrity.typesCount}`);
    console.log(`Integrity Check: ${integrity.isConsistent ? 'PASSED' : 'FAILED'}`);
    console.log('\nCategories:');
    integrity.categories.forEach(cat => console.log(`- ${cat}`));
    console.log('\nTypes:');
    integrity.types.forEach(type => console.log(`- ${type}`));
    console.log('=====================\n');

    return integrity;
  }
}