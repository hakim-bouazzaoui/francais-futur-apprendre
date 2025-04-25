import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Quiz } from '../models/ContentTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface QuizComponentProps {
  item: Quiz;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', {
      moduleId: item.id,
      lessonTitle: item.category,
      questions: [{
        id: item.id,
        question: item.question,
        options: item.options?.map(opt => opt.text) || [],
        correctAnswer: item.options?.findIndex(opt => opt.isCorrect) || 0,
        explanation: item.notes || 'No explanation provided.'
      }]
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Quiz</Title>
        <Paragraph style={styles.question}>{item.question}</Paragraph>
        {item.notes && (
          <Paragraph style={styles.notes}>Notes: {item.notes}</Paragraph>
        )}
        <View style={styles.tags}>
          {item.tags.map((tag, index) => (
            <Paragraph key={index} style={styles.tag}>#{tag}</Paragraph>
          ))}
        </View>
        <Button
          mode="contained"
          onPress={handleStartQuiz}
          style={styles.button}
        >
          Commencer le Quiz
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  notes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  button: {
    marginTop: 8,
  }
});

export default QuizComponent;