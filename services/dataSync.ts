import { ContentItem } from '../models/ContentTypes';
import { EventEmitter } from 'events';
import config from '../data/config.json';

// Event types for content changes
export const CONTENT_EVENTS = {
  CONTENT_UPDATED: 'contentUpdated',
  CONTENT_ERROR: 'contentError',
  NEW_CATEGORY_FOUND: 'newCategoryFound',
  NEW_TYPE_FOUND: 'newTypeFound',
};

class DataSyncService {
  private static instance: DataSyncService;
  private eventEmitter: EventEmitter;
  private lastUpdateTime: number;
  private contentMap: Map<string, ContentItem[]>;
  private categories: Set<string>;
  private contentTypes: Set<string>;
  
  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.lastUpdateTime = 0;
    this.contentMap = new Map();
    this.categories = new Set();
    this.contentTypes = new Set();
  }

  public static getInstance(): DataSyncService {
    if (!DataSyncService.instance) {
      DataSyncService.instance = new DataSyncService();
    }
    return DataSyncService.instance;
  }

  /**
   * Subscribe to content change events
   */
  public subscribe(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.on(event, callback);
  }

  /**
   * Unsubscribe from content change events
   */
  public unsubscribe(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(event, callback);
  }

  /**
   * Check for content updates in all JSON files
   */
  public async checkForUpdates(): Promise<void> {
    try {
      // Get list of content files from config
      const contentFiles = config.contentSources;
      
      for (const file of contentFiles) {
        await this.processContentFile(file);
      }

      this.lastUpdateTime = Date.now();
      this.eventEmitter.emit(CONTENT_EVENTS.CONTENT_UPDATED, {
        timestamp: this.lastUpdateTime,
        categories: Array.from(this.categories),
        types: Array.from(this.contentTypes),
      });
    } catch (error) {
      console.error('Error checking for updates:', error);
      this.eventEmitter.emit(CONTENT_EVENTS.CONTENT_ERROR, error);
    }
  }

  /**
   * Process a single content file
   */
  private async processContentFile(filename: string): Promise<void> {
    try {
      // Dynamic import of JSON file
      const content = require(`../data/json/${filename}`);
      
      // Extract and track categories and types
      content.forEach((item: ContentItem) => {
        if (!this.categories.has(item.category)) {
          this.categories.add(item.category);
          this.eventEmitter.emit(CONTENT_EVENTS.NEW_CATEGORY_FOUND, item.category);
        }

        if (!this.contentTypes.has(item.type)) {
          this.contentTypes.add(item.type);
          this.eventEmitter.emit(CONTENT_EVENTS.NEW_TYPE_FOUND, item.type);
        }
      });

      // Update content map
      this.contentMap.set(filename, content);

    } catch (error) {
      console.error(`Error processing file ${filename}:`, error);
      this.eventEmitter.emit(CONTENT_EVENTS.CONTENT_ERROR, {
        file: filename,
        error,
      });
    }
  }

  /**
   * Get all content items
   */
  public getAllContent(): ContentItem[] {
    const allContent: ContentItem[] = [];
    this.contentMap.forEach(items => allContent.push(...items));
    return allContent;
  }

  /**
   * Get content by category
   */
  public getContentByCategory(category: string): ContentItem[] {
    return this.getAllContent().filter(item => item.category === category);
  }

  /**
   * Get content by type
   */
  public getContentByType(type: string): ContentItem[] {
    return this.getAllContent().filter(item => item.type === type);
  }

  /**
   * Get all available categories
   */
  public getCategories(): string[] {
    return Array.from(this.categories);
  }

  /**
   * Get all available content types
   */
  public getContentTypes(): string[] {
    return Array.from(this.contentTypes);
  }

  /**
   * Get last update timestamp
   */
  public getLastUpdateTime(): number {
    return this.lastUpdateTime;
  }

  /**
   * Force refresh of all content
   */
  public async forceRefresh(): Promise<void> {
    this.contentMap.clear();
    this.categories.clear();
    this.contentTypes.clear();
    await this.checkForUpdates();
  }
}

export const dataSync = DataSyncService.getInstance();