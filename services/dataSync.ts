import { ContentItem } from '../models/ContentTypes';
import EventEmitter from './eventEmitter';
import config from '../data/config.json';
import { contentValidator } from './contentValidator';

// Import all JSON files statically
import * as assosJson from '../data/json/assos_syndicat.json';
import * as cultureAuteursJson from '../data/json/culture_auteurs.json';
import * as cultureJson from '../data/json/culture.json';
import * as droitsJson from '../data/json/droits_devoirs.json';
import * as educationJson from '../data/json/education.json';
import * as generalitesJson from '../data/json/generalites.json';
import * as geographyJson from '../data/json/geography.json';
import * as historyJson from '../data/json/history.json';
import * as institutionsJson from '../data/json/institutions.json';
import * as justiceJson from '../data/json/justice.json';
import * as laiciteJson from '../data/json/laicite.json';
import * as orgaIntJson from '../data/json/orga_internationale.json';
import * as orgaTerritoireJson from '../data/json/orga_territoire.json';
import * as principesJson from '../data/json/principes_orga_pouvoirs.json';
import * as protectionJson from '../data/json/protection_sociale.json';
import * as santeJson from '../data/json/sante.json';
import * as securiteJson from '../data/json/securite_defense.json';
import * as valeursJson from '../data/json/valeurs_republique.json';
import * as testSyncJson from '../data/json/test_sync.json';

// Map file names to their content
const contentFiles: { [key: string]: any } = {
  'assos_syndicat.json': assosJson,
  'culture_auteurs.json': cultureAuteursJson,
  'culture.json': cultureJson,
  'droits_devoirs.json': droitsJson,
  'education.json': educationJson,
  'generalites.json': generalitesJson,
  'geography.json': geographyJson,
  'history.json': historyJson,
  'institutions.json': institutionsJson,
  'justice.json': justiceJson,
  'laicite.json': laiciteJson,
  'orga_internationale.json': orgaIntJson,
  'orga_territoire.json': orgaTerritoireJson,
  'principes_orga_pouvoirs.json': principesJson,
  'protection_sociale.json': protectionJson,
  'sante.json': santeJson,
  'securite_defense.json': securiteJson,
  'valeurs_republique.json': valeursJson,
  'test_sync.json': testSyncJson
};

// Event types for content changes
export const CONTENT_EVENTS = {
  CONTENT_UPDATED: 'contentUpdated',
  CONTENT_ERROR: 'contentError',
  NEW_CATEGORY_FOUND: 'newCategoryFound',
  NEW_TYPE_FOUND: 'newTypeFound',
  FILE_LOADED: 'fileLoaded',
  FILE_ERROR: 'fileError'
};

class DataSyncService {
  private static instance: DataSyncService;
  private eventEmitter: EventEmitter;
  private lastUpdateTime: number;
  private contentMap: Map<string, ContentItem[]>;
  private categories: Set<string>;
  private contentTypes: Set<string>;
  private loadedFiles: Set<string>;
  
  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.lastUpdateTime = 0;
    this.contentMap = new Map();
    this.categories = new Set();
    this.contentTypes = new Set();
    this.loadedFiles = new Set();
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
      // Clear loaded files set before checking
      this.loadedFiles.clear();
      
      // Get list of content files from config
      const contentFiles = config.contentSources;
      
      for (const file of contentFiles) {
        await this.processContentFile(file);
      }

      this.lastUpdateTime = Date.now();
      this.eventEmitter.emit(CONTENT_EVENTS.CONTENT_UPDATED, {
        timestamp: this.lastUpdateTime,
        loadedFiles: Array.from(this.loadedFiles),
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
      // Get content from imported files
      const content = contentFiles[filename]?.default || [];

      // Validate content structure
      const validationResult = contentValidator.validateContent(content);
      if (!validationResult.isValid) {
        throw new Error(`Invalid content in ${filename}: ${validationResult.errors.map(e => e.message).join(', ')}`);
      }
      
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
      this.loadedFiles.add(filename);

      // Emit file loaded event
      this.eventEmitter.emit(CONTENT_EVENTS.FILE_LOADED, {
        file: filename,
        itemCount: content.length
      });

    } catch (error) {
      console.error(`Error processing file ${filename}:`, error);
      this.eventEmitter.emit(CONTENT_EVENTS.FILE_ERROR, {
        file: filename,
        error: error instanceof Error ? error.message : 'Unknown error'
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
   * Get loaded files
   */
  public getLoadedFiles(): string[] {
    return Array.from(this.loadedFiles);
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
    this.loadedFiles.clear();
    await this.checkForUpdates();
  }
}

export const dataSync = DataSyncService.getInstance();