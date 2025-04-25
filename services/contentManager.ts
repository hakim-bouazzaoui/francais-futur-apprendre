import { ContentItem } from '../models/ContentTypes';
import config from '../data/config.json';

// Import all JSON files
const contentFiles = {
  'assos_syndicat.json': () => require('../data/json/assos_syndicat.json'),
  'culture_auteurs.json': () => require('../data/json/culture_auteurs.json'),
  'droits_devoirs.json': () => require('../data/json/droits_devoirs.json'),
  'education.json': () => require('../data/json/education.json'),
  'generalites.json': () => require('../data/json/generalites.json'),
  'geography.json': () => require('../data/json/geography.json'),
  'history.json': () => require('../data/json/history.json'),
  'institutions.json': () => require('../data/json/institutions.json'),
  'orga_territoire.json': () => require('../data/json/orga_territoire.json'),
  'protection_sociale.json': () => require('../data/json/protection_sociale.json'),
  'sante.json': () => require('../data/json/sante.json'),
  'securite_defense.json': () => require('../data/json/securite_defense.json'),
  'valeurs_republique.json': () => require('../data/json/valeurs_republique.json'),
};

/**
 * Checks if a directory is protected (read-only)
 */
const isProtectedDirectory = (path: string): boolean => {
  return config.protectedDirectories.some(dir => path.startsWith(dir));
};

/**
 * Returns all content items loaded from JSON files.
 * This function is read-only and cannot modify the source files.
 */
export const getContentItems = (): ContentItem[] => {
  if (!config.readOnly) {
    console.warn('Warning: Content should be read-only. Check configuration.');
  }

  try {
    // Combine all content from specified files
    const allContent = config.contentSources.reduce<ContentItem[]>((acc, filename) => {
      if (contentFiles[filename]) {
        const content = contentFiles[filename]();
        return [...acc, ...content];
      }
      console.warn(`Warning: Content file ${filename} not found.`);
      return acc;
    }, []);

    return allContent;
  } catch (error) {
    console.error('Error loading content:', error);
    return [];
  }
};

/**
 * Returns content items filtered by category.
 */
export const getContentByCategory = (category: string): ContentItem[] => {
  return getContentItems().filter(item => item.category === category);
};

/**
 * Returns content items filtered by type.
 */
export const getContentByType = (type: ContentItem['type']): ContentItem[] => {
  return getContentItems().filter(item => item.type === type);
};

/**
 * Returns content items filtered by tag.
 */
export const getContentByTag = (tag: string): ContentItem[] => {
  return getContentItems().filter(item => item.tags.includes(tag));
};

/**
 * Returns content items filtered by difficulty level.
 */
export const getContentByDifficulty = (difficulty: number): ContentItem[] => {
  return getContentItems().filter(item => item.difficulty === difficulty);
};

/**
 * Returns a single content item by ID.
 */
export const getContentById = (id: string): ContentItem | undefined => {
  return getContentItems().find(item => item.id === id);
};

/**
 * Returns all unique categories from the content.
 */
export const getCategories = (): string[] => {
  return Array.from(new Set(getContentItems().map(item => item.category)));
};

/**
 * Returns all unique tags from the content.
 */
export const getTags = (): string[] => {
  const allTags = getContentItems().flatMap(item => item.tags);
  return Array.from(new Set(allTags));
};

/**
 * Searches content items by a query string.
 * Searches through various fields depending on the content type.
 */
export const searchContent = (query: string): ContentItem[] => {
  const searchTerm = query.toLowerCase();
  
  return getContentItems().filter(item => {
    // Search common fields
    if (
      item.id.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    ) {
      return true;
    }

    // Search type-specific fields
    switch (item.type) {
      case 'Flashcard':
        return (
          item.front.toLowerCase().includes(searchTerm) ||
          item.back.toLowerCase().includes(searchTerm)
        );
      case 'Quiz':
        return (
          item.question.toLowerCase().includes(searchTerm) ||
          item.answer.toLowerCase().includes(searchTerm) ||
          item.options?.some(opt => opt.text.toLowerCase().includes(searchTerm))
        );
      case 'Lesson':
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.key_points.some(point => point.toLowerCase().includes(searchTerm))
        );
      case 'Term':
        return (
          item.term.toLowerCase().includes(searchTerm) ||
          item.definition.toLowerCase().includes(searchTerm)
        );
      default:
        return false;
    }
  });
};

// Prevent any attempts to modify content
if (config.readOnly) {
  Object.freeze(contentFiles);
}