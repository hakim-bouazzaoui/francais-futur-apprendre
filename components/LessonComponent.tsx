import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import { Lesson } from '../models/ContentTypes';
import { theme } from '../constants/theme';

interface LessonComponentProps {
  item: Lesson;
}

const LessonComponent: React.FC<LessonComponentProps> = ({ item }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Title style={styles.title}>{item.title}</Title>
      
      {item.key_points.map((point, index) => {
        // Check if the point starts with a bullet point marker
        if (point.startsWith('-')) {
          return (
            <List.Item
              key={index}
              title={point.substring(1).trim()}
              left={props => <List.Icon {...props} icon="chevron-right" />}
              titleStyle={styles.listItem}
            />
          );
        }
        // Regular paragraph for non-bullet points
        return (
          <Paragraph key={index} style={styles.paragraph}>
            {point}
          </Paragraph>
        );
      })}

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.primary,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
  },
  notes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
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

export default LessonComponent;