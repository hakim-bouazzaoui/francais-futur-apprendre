import { dataSync, CONTENT_EVENTS } from '../dataSync';
import { contentRegistry } from '../contentRegistry';
import { contentValidator } from '../contentValidator';
import { ContentItem } from '../../models/ContentTypes';

// Test data
const testQuiz: ContentItem = {
  id: "TEST001",
  category: "Test Category",
  type: "Quiz",
  tags: ["test"],
  question: "Test question?",
  answer: "Test answer",
  options: [
    { text: "Wrong", isCorrect: false },
    { text: "Test answer", isCorrect: true }
  ],
  difficulty: 1
};

describe('Content Synchronization System', () => {
  beforeAll(async () => {
    await contentRegistry.initialize();
  });

  it('should detect and validate new content', async () => {
    let contentUpdated = false;
    let newContentError = false;

    // Subscribe to content events
    dataSync.subscribe(CONTENT_EVENTS.CONTENT_UPDATED, () => {
      contentUpdated = true;
    });

    dataSync.subscribe(CONTENT_EVENTS.CONTENT_ERROR, () => {
      newContentError = true;
    });

    // Test content validation
    const validationResult = contentValidator.validateItem(testQuiz);
    expect(validationResult.isValid).toBeTruthy();
    expect(validationResult.errors).toHaveLength(0);

    // Force content refresh
    await dataSync.forceRefresh();

    // Content should be updated without errors
    expect(contentUpdated).toBeTruthy();
    expect(newContentError).toBeFalsy();
  });

  it('should handle invalid content', () => {
    const invalidQuiz = {
      ...testQuiz,
      options: undefined // Make it invalid
    };

    const validationResult = contentValidator.validateItem(invalidQuiz as any);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors.length).toBeGreaterThan(0);
  });

  it('should track categories correctly', async () => {
    const initialCategories = contentRegistry.getCategories();
    
    // New category should be added
    const newQuiz: ContentItem = {
      ...testQuiz,
      id: "TEST002",
      category: "New Test Category"
    };

    // Add new content
    await dataSync.checkForUpdates();
    
    const updatedCategories = contentRegistry.getCategories();
    expect(updatedCategories.length).toBeGreaterThan(initialCategories.length);
    expect(updatedCategories).toContain(newQuiz.category);
  });

  it('should handle content updates', async () => {
    const initialContent = contentRegistry.getContent();
    
    // Force refresh to simulate content update
    await dataSync.forceRefresh();
    
    const updatedContent = contentRegistry.getContent();
    expect(updatedContent).toBeDefined();
    expect(updatedContent.length).toBeGreaterThanOrEqual(initialContent.length);
  });

  it('should maintain content integrity', () => {
    const content = contentRegistry.getContent();
    
    // Check each content item
    content.forEach(item => {
      const validation = contentValidator.validateItem(item);
      expect(validation.isValid).toBeTruthy();
      expect(validation.errors).toHaveLength(0);
    });
  });

  // Test category and type management
  it('should manage categories and types correctly', () => {
    const categories = contentRegistry.getCategories();
    const types = contentRegistry.getTypes();

    expect(categories.length).toBeGreaterThan(0);
    expect(types).toContain('Quiz');
    expect(types).toContain('Flashcard');
    expect(types).toContain('Lesson');
    expect(types).toContain('Term');
  });

  // Test content filtering
  it('should filter content correctly', () => {
    const category = contentRegistry.getCategories()[0];
    const filteredContent = contentRegistry.getContentByCategory(category);

    expect(filteredContent.length).toBeGreaterThan(0);
    expect(filteredContent.every(item => item.category === category)).toBeTruthy();
  });
});