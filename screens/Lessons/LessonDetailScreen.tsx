import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../constants/theme';
import type { RootStackParamList, QuizQuestion } from '../../navigation/types';

type LessonDetailParams = {
  moduleId: string;
  lessonTitle: string;
  lessonContent?: string;
};

const mockLessonContent: Record<string, { content: string; quiz: QuizQuestion[] }> = {
  'La Révolution française': {
    content: `La Révolution française est une période cruciale de l'histoire de France qui a débuté en 1789.

Les causes principales :
• Crise financière de l'État
• Inégalités sociales
• Influence des idées des Lumières

Événements clés :
• 14 juillet 1789 : Prise de la Bastille
• 26 août 1789 : Déclaration des droits de l'homme et du citoyen
• 21 septembre 1792 : Proclamation de la République`,
    quiz: [
      {
        id: '1',
        question: 'En quelle année a débuté la Révolution française ?',
        options: ['1789', '1792', '1786', '1799'],
        correctAnswer: 0,
        explanation: 'La Révolution française a débuté en 1789, marquée notamment par la prise de la Bastille le 14 juillet.'
      },
      {
        id: '2',
        question: 'Quel événement marque le début de la Révolution française ?',
        options: [
          'La prise de la Bastille',
          'La déclaration des droits de l\'homme',
          'La fuite du roi',
          'Les États généraux'
        ],
        correctAnswer: 0,
        explanation: 'La prise de la Bastille le 14 juillet 1789 est considérée comme le début symbolique de la Révolution française.'
      },
      {
        id: '3',
        question: 'Quelle déclaration importante a été adoptée en août 1789 ?',
        options: [
          'La Constitution',
          'La Déclaration des droits de l\'homme et du citoyen',
          'La Proclamation de la République',
          'Le Serment du Jeu de paume'
        ],
        correctAnswer: 1,
        explanation: 'La Déclaration des droits de l\'homme et du citoyen a été adoptée le 26 août 1789, établissant les droits fondamentaux.'
      }
    ]
  }
};

const LessonDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as LessonDetailParams;

  const lessonData = mockLessonContent[params.lessonTitle];

  const handleStartQuiz = () => {
    if (lessonData?.quiz) {
      navigation.navigate('Quiz', {
        moduleId: params.moduleId,
        lessonTitle: params.lessonTitle,
        questions: lessonData.quiz
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{params.lessonTitle}</Title>
            
            {lessonData ? (
              <>
                <Paragraph style={styles.content}>{lessonData.content}</Paragraph>
                
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={handleStartQuiz}
                >
                  Commencer le quiz
                </Button>
              </>
            ) : (
              <Paragraph>Contenu en cours de préparation</Paragraph>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  content: {
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default LessonDetailScreen;