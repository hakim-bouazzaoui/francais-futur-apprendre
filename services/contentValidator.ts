import { ContentItem } from '../models/ContentTypes';

export class ValidationError extends Error {
  constructor(message: string, public details: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class ContentValidator {
  private static instance: ContentValidator;
  
  private constructor() {}

  public static getInstance(): ContentValidator {
    if (!ContentValidator.instance) {
      ContentValidator.instance = new ContentValidator();
    }
    return ContentValidator.instance;
  }

  /**
   * Validate a single content item
   */
  public validateItem(item: ContentItem): ValidationResult {
    const errors: ValidationError[] = [];

    try {
      // Common fields validation
      this.validateCommonFields(item, errors);

      // Type-specific validation
      switch (item.type) {
        case 'Quiz':
          this.validateQuiz(item, errors);
          break;
        case 'Flashcard':
          this.validateFlashcard(item, errors);
          break;
        case 'Lesson':
          this.validateLesson(item, errors);
          break;
        case 'Term':
          this.validateTerm(item, errors);
          break;
        default:
          errors.push(new ValidationError(
            'Invalid content type',
            { type: item.type, id: item.id }
          ));
      }
    } catch (error) {
      errors.push(new ValidationError(
        'Unexpected validation error',
        { error, item }
      ));
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate common fields present in all content types
   */
  private validateCommonFields(item: any, errors: ValidationError[]): void {
    if (!item.id || typeof item.id !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing id',
        { id: item.id }
      ));
    }

    if (!item.category || typeof item.category !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing category',
        { category: item.category, id: item.id }
      ));
    }

    if (!Array.isArray(item.tags)) {
      errors.push(new ValidationError(
        'Invalid or missing tags array',
        { tags: item.tags, id: item.id }
      ));
    }

    if (typeof item.difficulty !== 'number' || item.difficulty < 1 || item.difficulty > 3) {
      errors.push(new ValidationError(
        'Invalid difficulty level (must be 1-3)',
        { difficulty: item.difficulty, id: item.id }
      ));
    }
  }

  /**
   * Validate Quiz content
   */
  private validateQuiz(item: any, errors: ValidationError[]): void {
    if (!item.question || typeof item.question !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing question',
        { id: item.id }
      ));
    }

    if (!item.answer || typeof item.answer !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing answer',
        { id: item.id }
      ));
    }

    if (!Array.isArray(item.options)) {
      errors.push(new ValidationError(
        'Invalid or missing options array',
        { id: item.id }
      ));
    } else {
      // Validate each option
      const hasCorrectAnswer = item.options.some(opt => opt.isCorrect === true);
      if (!hasCorrectAnswer) {
        errors.push(new ValidationError(
          'Quiz must have at least one correct answer',
          { id: item.id }
        ));
      }

      item.options.forEach((option: any, index: number) => {
        if (!option.text || typeof option.text !== 'string') {
          errors.push(new ValidationError(
            'Invalid option text',
            { id: item.id, optionIndex: index }
          ));
        }
        if (typeof option.isCorrect !== 'boolean') {
          errors.push(new ValidationError(
            'Invalid isCorrect value in option',
            { id: item.id, optionIndex: index }
          ));
        }
      });
    }
  }

  /**
   * Validate Flashcard content
   */
  private validateFlashcard(item: any, errors: ValidationError[]): void {
    if (!item.front || typeof item.front !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing front content',
        { id: item.id }
      ));
    }

    if (!item.back || typeof item.back !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing back content',
        { id: item.id }
      ));
    }
  }

  /**
   * Validate Lesson content
   */
  private validateLesson(item: any, errors: ValidationError[]): void {
    if (!item.title || typeof item.title !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing lesson title',
        { id: item.id }
      ));
    }

    if (!Array.isArray(item.key_points)) {
      errors.push(new ValidationError(
        'Invalid or missing key_points array',
        { id: item.id }
      ));
    } else {
      item.key_points.forEach((point: any, index: number) => {
        if (typeof point !== 'string') {
          errors.push(new ValidationError(
            'Invalid key point',
            { id: item.id, pointIndex: index }
          ));
        }
      });
    }
  }

  /**
   * Validate Term content
   */
  private validateTerm(item: any, errors: ValidationError[]): void {
    if (!item.term || typeof item.term !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing term',
        { id: item.id }
      ));
    }

    if (!item.definition || typeof item.definition !== 'string') {
      errors.push(new ValidationError(
        'Invalid or missing definition',
        { id: item.id }
      ));
    }
  }

  /**
   * Validate an array of content items
   */
  public validateContent(items: ContentItem[]): ValidationResult {
    const errors: ValidationError[] = [];
    
    items.forEach(item => {
      const result = this.validateItem(item);
      if (!result.isValid) {
        errors.push(...result.errors);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const contentValidator = ContentValidator.getInstance();