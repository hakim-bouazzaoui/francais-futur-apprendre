import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContentItem, Flashcard, Quiz, Lesson, Term } from '../models/ContentTypes';

// Import stub components (will be created next)
import FlashcardComponent from './FlashcardComponent';
import QuizComponent from './QuizComponent';
import LessonComponent from './LessonComponent';
import TermComponent from './TermComponent';

interface ContentRendererProps {
  item: ContentItem;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ item }) => {
  switch (item.type) {
    case 'Flashcard':
      return <FlashcardComponent item={item as Flashcard} />;
    case 'Quiz':
      // Note: The Quiz component will need to handle navigation to the actual QuizScreen
      return <QuizComponent item={item as Quiz} />;
    case 'Lesson':
      return <LessonComponent item={item as Lesson} />;
    case 'Term':
      return <TermComponent item={item as Term} />;
    default:
      // Handle unknown types or display a message
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Unknown content type: {(item as any).type}</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ContentRenderer;