import { ContentItem } from '../models/ContentTypes';
import { dataSync, CONTENT_EVENTS } from './dataSync';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CONTENT_CACHE: 'content_cache',
  LAST_UPDATE: 'content_last_update',
  CATEGORIES: 'content_categories',
  TYPES: 'content_types',
};

class ContentRegistry {
  private static instance: ContentRegistry;
  private initialized: boolean = false;
  private content: ContentItem[] = [];
  private categorizedContent: Map<string, ContentItem[]> = new Map();
  private typedContent: Map<string, ContentItem[]> = new Map();
  
  private constructor() {
    // Subscribe to data sync events
    dataSync.subscribe(CONTENT_EVENTS.CONTENT_UPDATED, this.handleContentUpdate);
    dataSync.subscribe(CONTENT_EVENTS.NEW_CATEGORY_FOUND, this.handleNewCategory);
    dataSync.subscribe(CONTENT_EVENTS.NEW_TYPE_FOUND, this.handleNewType);
  }

  public static getInstance(): ContentRegistry {
    if (!ContentRegistry.instance) {
      ContentRegistry.instance = new ContentRegistry();
    }
    return ContentRegistry.instance;
  }

  /**
   * Initialize the registry with cached data and check for updates
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Load cached content
      await this.loadFromCache();
      
      // Check for updates
      await dataSync.checkForUpdates();
      
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing content registry:', error);
      throw error;
    }
  }

  /**
   * Load content from cache
   */
  private async loadFromCache(): Promise<void> {
    try {
      const [
        cachedContent,
        cachedLastUpdate,
        cachedCategories,
        cachedTypes
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CONTENT_CACHE),
        AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE),
        AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES),
        AsyncStorage.getItem(STORAGE_KEYS.TYPES)
      ]);

      if (cachedContent) {
        this.content = JSON.parse(cachedContent);
        this.organizeCachedContent();
      }
    } catch (error) {
      console.error('Error loading from cache:', error);
    }
  }

  /**
   * Organize cached content into categories and types
   */
  private organizeCachedContent(): void {
    this.categorizedContent.clear();
    this.typedContent.clear();

    this.content.forEach(item => {
      // Organize by category
      if (!this.categorizedContent.has(item.category)) {
        this.categorizedContent.set(item.category, []);
      }
      this.categorizedContent.get(item.category)?.push(item);

      // Organize by type
      if (!this.typedContent.has(item.type)) {
        this.typedContent.set(item.type, []);
      }
      this.typedContent.get(item.type)?.push(item);
    });
  }

  /**
   * Handle content updates from DataSync
   */
  private handleContentUpdate = async (data: { timestamp: number }) => {
    this.content = dataSync.getAllContent();
    this.organizeCachedContent();

    // Update cache
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.CONTENT_CACHE, JSON.stringify(this.content)),
        AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATE, data.timestamp.toString())
      ]);
    } catch (error) {
      console.error('Error caching content:', error);
    }
  };

  /**
   * Handle new category discovery
   */
  private handleNewCategory = async (category: string) => {
    this.categorizedContent.set(category, []);
    try {
      const categories = Array.from(this.categorizedContent.keys());
      await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Error caching categories:', error);
    }
  };

  /**
   * Handle new type discovery
   */
  private handleNewType = async (type: string) => {
    this.typedContent.set(type, []);
    try {
      const types = Array.from(this.typedContent.keys());
      await AsyncStorage.setItem(STORAGE_KEYS.TYPES, JSON.stringify(types));
    } catch (error) {
      console.error('Error caching types:', error);
    }
  };

  /**
   * Get all content
   */
  public getContent(): ContentItem[] {
    return this.content;
  }

  /**
   * Get content by category
   */
  public getContentByCategory(category: string): ContentItem[] {
    return this.categorizedContent.get(category) || [];
  }

  /**
   * Get content by type
   */
  public getContentByType(type: string): ContentItem[] {
    return this.typedContent.get(type) || [];
  }

  /**
   * Get all categories
   */
  public getCategories(): string[] {
    return Array.from(this.categorizedContent.keys());
  }

  /**
   * Get all types
   */
  public getTypes(): string[] {
    return Array.from(this.typedContent.keys());
  }

  /**
   * Force refresh content
   */
  public async forceRefresh(): Promise<void> {
    await dataSync.forceRefresh();
  }
}

export const contentRegistry = ContentRegistry.getInstance();