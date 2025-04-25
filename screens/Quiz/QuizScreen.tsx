import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import type { RootStackParamList, QuizResult } from '../../navigation/types';
import { addQuizQuestionsToSRS } from '../../services/srs';

type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

const QuizScreen: React.FC = () => {
  const route = useRoute<QuizScreenRouteProp>();
  const navigation = useNavigation<QuizScreenNavigationProp>();
  const { questions, moduleId, lessonTitle } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime] = useState(Date.now());
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = () => {
    if (selectedAnswer === null || isTransitioning) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Debug log for answer
    console.log('=== Answer Check ===');
    console.log('Question:', currentQuestionIndex + 1);
    console.log('Selected:', selectedAnswer);
    console.log('Correct:', currentQuestion.correctAnswer);
    console.log('Is Correct:', isCorrect);
    console.log('=================');

    setAnswers([...answers, isCorrect]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // Animate out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(async () => {
      if (isLastQuestion) {
        const endTime = Date.now();
        const timeSpent = (endTime - startTime) / 1000;
        
        // Debug logs for score calculation
        console.log('=== Quiz Score Calculation ===');
        console.log('Total Questions:', questions.length);
        console.log('Answers Array:', answers);
        console.log('Answers Length:', answers.length);

        // Just count the answers we have - they're already stored correctly
        const correctAnswers = answers.filter((answer: boolean) => answer).length;
        console.log('Correct Answers:', correctAnswers);
        
        const score = Math.max(0, Math.min(100, 
          Math.round((correctAnswers / questions.length) * 100)
        ));
        console.log('Final Score:', score);
        console.log('========================');

        // Add questions to SRS system
        try {
          await addQuizQuestionsToSRS(moduleId, lessonTitle, questions);
        } catch (error) {
          console.error('Error adding questions to SRS:', error);
        }

        const result: QuizResult = {
          moduleId,
          lessonTitle,
          date: new Date().toISOString(),
          score,
          totalQuestions: questions.length,
          timeSpent,
          questions, // Include the questions array
          answers: questions.map((_: any, index: number) => ({
            questionId: questions[index].id,
            correct: answers[index] || false,
          })),
        };

        navigation.navigate('QuizResults', { result });
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);

      // Animate in
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} sur {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Question Card */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.question}>{currentQuestion.question}</Title>
              
              <RadioButton.Group
                onValueChange={value => !isTransitioning && setSelectedAnswer(Number(value))}
                value={selectedAnswer?.toString() ?? ''}
              >
                {currentQuestion.options.map((option: string, index: number) => (
                  <RadioButton.Item
                    key={index}
                    label={option}
                    value={index.toString()}
                    disabled={showExplanation || isTransitioning}
                    labelStyle={[
                      styles.optionLabel,
                      showExplanation && index === currentQuestion.correctAnswer && styles.correctAnswer,
                      showExplanation && selectedAnswer === index && 
                      index !== currentQuestion.correctAnswer && styles.wrongAnswer
                    ]}
                  />
                ))}
              </RadioButton.Group>

              {showExplanation && (
                <Card style={styles.explanationCard}>
                  <Card.Content>
                    <Paragraph style={styles.explanation}>
                      {currentQuestion.explanation}
                    </Paragraph>
                  </Card.Content>
                </Card>
              )}
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {!showExplanation ? (
            <Button
              mode="contained"
              onPress={handleAnswer}
              disabled={selectedAnswer === null || isTransitioning}
              style={styles.button}
            >
              Vérifier
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleNext}
              disabled={isTransitioning}
              style={styles.button}
            >
              {isLastQuestion ? 'Terminer' : 'Question suivante'}
            </Button>
          )}
        </View>
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
  progressContainer: {
    padding: 16,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  question: {
    fontSize: 20,
    marginBottom: 24,
  },
  optionLabel: {
    fontSize: 16,
  },
  correctAnswer: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  wrongAnswer: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  explanationCard: {
    marginTop: 16,
    backgroundColor: '#f5f5f5',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default QuizScreen;