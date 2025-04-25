import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../constants/theme';
import type { RootStackParamList } from '../../navigation/types';
import { saveQuizResult } from '../../services/storage';

type QuizResultsProps = NativeStackScreenProps<RootStackParamList, 'QuizResults'>;

const QuizResultsScreen = () => {
  const route = useRoute<QuizResultsProps['route']>();
  const navigation = useNavigation();
  const { result } = route.params;

  // Animations
  const scoreAnimation = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Save result to storage
    saveQuizResult(result).catch(console.error);

    // Start animations
    Animated.parallel([
      Animated.timing(scoreAnimation, {
        toValue: result.score,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedScore = scoreAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleRetryQuiz = () => {
    // Navigate back to the quiz
    navigation.goBack();
  };

  const handleFinish = () => {
    // Navigate back to lesson detail
    navigation.pop(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Score Card */}
          <Card style={styles.card}>
            <Card.Content style={styles.scoreContent}>
              <Title style={styles.scoreTitle}>Résultat du Quiz</Title>
              <View style={styles.scoreCircle}>
                <Animated.Text style={styles.scoreText}>
                  {animatedScore}
                </Animated.Text>
              </View>
              <Paragraph style={styles.scoreSummary}>
                {result.score >= 80 ? '🎉 Excellent travail !' :
                 result.score >= 60 ? '👍 Bon travail !' :
                 'Continuez vos efforts !'}
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Stats Card */}
          <Card style={styles.card}>
            <Card.Content>
              <Title>Détails</Title>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Questions</Text>
                  <Text style={styles.statValue}>{result.totalQuestions}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Correctes</Text>
                  <Text style={styles.statValue}>
                    {result.answers.filter(a => a.correct).length}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Temps</Text>
                  <Text style={styles.statValue}>
                    {Math.round(result.timeSpent / 60)}min
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleFinish}
              style={styles.button}
            >
              Terminer
            </Button>
            <Button
              mode="outlined"
              onPress={handleRetryQuiz}
              style={[styles.button, styles.retryButton]}
            >
              Réessayer
            </Button>
          </View>
        </Animated.View>
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
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  scoreContent: {
    alignItems: 'center',
    padding: 16,
  },
  scoreTitle: {
    fontSize: 24,
    marginBottom: 24,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreSummary: {
    fontSize: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
  retryButton: {
    borderColor: theme.colors.primary,
  },
});

export default QuizResultsScreen;