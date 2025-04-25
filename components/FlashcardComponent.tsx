import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flashcard } from '../models/ContentTypes';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../constants/theme';

interface FlashcardComponentProps {
  item: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ item }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title style={styles.title}>{item.front}</Title>
      <Paragraph style={styles.paragraph}>{item.back}</Paragraph>
      {item.notes && <Paragraph style={styles.notes}>Notes: {item.notes}</Paragraph>}
      {/* Add image rendering if image_ref exists */}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
  },
  notes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
  },
});

export default FlashcardComponent;