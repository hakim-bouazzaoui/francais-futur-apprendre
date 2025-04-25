import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Term } from '../models/ContentTypes';
import { theme } from '../constants/theme';

interface TermComponentProps {
  item: Term;
}

const TermComponent: React.FC<TermComponentProps> = ({ item }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title style={styles.term}>{item.term}</Title>
      <Divider style={styles.divider} />
      <Paragraph style={styles.definition}>{item.definition}</Paragraph>

      {item.notes && (
        <Paragraph style={styles.notes}>Notes: {item.notes}</Paragraph>
      )}

      <View style={styles.tags}>
        {item.tags.map((tag, index) => (
          <Paragraph key={index} style={styles.tag}>#{tag}</Paragraph>
        ))}
      </View>

      <Paragraph style={styles.difficulty}>
        Niveau de difficulté: {item.difficulty}/3
      </Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  term: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: theme.colors.primary,
    height: 1,
  },
  definition: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  notes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 8,
  },
  tag: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  difficulty: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
});

export default TermComponent;