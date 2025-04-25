import { ContentItem } from '../models/ContentTypes';
import { getContentItems, getCategories } from './contentManager';

interface CategoryStats {
  total: number;
  byType: {
    Quiz: number;
    Flashcard: number;
    Lesson: number;
    Term: number;
  };
}

interface ContentStats {
  totalItems: number;
  byCategory: Record<string, CategoryStats>;
}

/**
 * Analyzes content distribution across categories and types
 */
export const analyzeContent = (): ContentStats => {
  const items = getContentItems();
  const categories = getCategories();
  
  const stats: ContentStats = {
    totalItems: items.length,
    byCategory: {}
  };

  // Initialize stats for each category
  categories.forEach(category => {
    stats.byCategory[category] = {
      total: 0,
      byType: {
        Quiz: 0,
        Flashcard: 0,
        Lesson: 0,
        Term: 0
      }
    };
  });

  // Count items by category and type
  items.forEach(item => {
    const categoryStats = stats.byCategory[item.category];
    if (categoryStats) {
      categoryStats.total++;
      categoryStats.byType[item.type]++;
    } else {
      console.warn(`Unknown category found: ${item.category}`);
    }
  });

  return stats;
};

/**
 * Prints a formatted report of content distribution
 */
export const printContentReport = () => {
  const stats = analyzeContent();
  
  console.log('\n=== Content Distribution Report ===');
  console.log(`Total Items: ${stats.totalItems}\n`);
  
  Object.entries(stats.byCategory).forEach(([category, data]) => {
    console.log(`Category: ${category}`);
    console.log(`Total Items: ${data.total}`);
    console.log('By Type:');
    Object.entries(data.byType).forEach(([type, count]) => {
      if (count > 0) {
        console.log(`  - ${type}: ${count}`);
      }
    });
    console.log('');
  });
};

/**
 * Validates content structure and returns any issues found
 */
export const validateContent = (): string[] => {
  const items = getContentItems();
  const issues: string[] = [];

  items.forEach((item: ContentItem) => {
    // Check required fields
    if (!item.id) issues.push(`Item missing ID: ${JSON.stringify(item)}`);
    if (!item.category) issues.push(`Item missing category: ${item.id}`);
    if (!item.type) issues.push(`Item missing type: ${item.id}`);
    if (!item.tags || !Array.isArray(item.tags)) issues.push(`Item missing or invalid tags: ${item.id}`);
    if (typeof item.difficulty !== 'number') issues.push(`Item missing or invalid difficulty: ${item.id}`);

    // Type-specific validation
    switch (item.type) {
      case 'Quiz':
        if (!item.question) issues.push(`Quiz missing question: ${item.id}`);
        if (!item.answer) issues.push(`Quiz missing answer: ${item.id}`);
        if (!item.options || !Array.isArray(item.options)) {
          issues.push(`Quiz missing or invalid options: ${item.id}`);
        }
        break;

      case 'Flashcard':
        if (!item.front) issues.push(`Flashcard missing front: ${item.id}`);
        if (!item.back) issues.push(`Flashcard missing back: ${item.id}`);
        break;

      case 'Lesson':
        if (!item.title) issues.push(`Lesson missing title: ${item.id}`);
        if (!item.key_points || !Array.isArray(item.key_points)) {
          issues.push(`Lesson missing or invalid key_points: ${item.id}`);
        }
        break;

      case 'Term':
        if (!item.term) issues.push(`Term missing term: ${item.id}`);
        if (!item.definition) issues.push(`Term missing definition: ${item.id}`);
        break;

      default:
        issues.push(`Unknown content type: ${item.type} for item ${item.id}`);
    }
  });

  return issues;
};

/**
 * Run all tests and print results
 */
export const runContentTests = () => {
  console.log('\n=== Running Content Tests ===\n');

  // Print content distribution
  printContentReport();

  // Validate content structure
  const issues = validateContent();
  
  if (issues.length > 0) {
    console.log('\nIssues Found:');
    issues.forEach(issue => console.log(` - ${issue}`));
  } else {
    console.log('\nNo issues found! All content is properly structured.');
  }
};