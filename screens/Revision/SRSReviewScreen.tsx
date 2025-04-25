import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../../constants/theme';
import type { RootStackParamList } from '../../navigation/types';
import { updateItemInterval } from '../../services/srs';

type SRSReviewScreenProps = NativeStackScreenProps<RootStackParamList, 'SRSReview'>;

const SRSReviewScreen = () => {
  const route = useRoute<SRSReviewScreenProps['route']>();
  const navigation = useNavigation();
  const { items } = route.params;

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentItem = items[currentItemIndex];
  const isLastItem = currentItemIndex === items.length - 1;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleResponse = async (wasCorrect: boolean) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    try {
      // Update the item's SRS data
      await updateItemInterval(currentItem.id, wasCorrect);
      
      // Animate out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (isLastItem) {
          // Return to revision screen
          navigation.goBack();
          return;
        }

        // Move to next item
        setCurrentItemIndex(currentItemIndex + 1);
        setShowAnswer(false);

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
    } catch (error) {
      console.error('Error updating SRS item:', error);
      setIsTransitioning(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Révision {currentItemIndex + 1} sur {items.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentItemIndex + 1) / items.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Question Card */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.moduleTitle}>{currentItem.lessonTitle}</Title>
              <Title style={styles.question}>{currentItem.question}</Title>
              
              {showAnswer ? (
                <>
                  <View style={styles.responseButtons}>
                    <Button
                      mode="contained"
                      onPress={() => handleResponse(false)}
                      style={[styles.button, styles.incorrectButton]}
                      disabled={isTransitioning}
                    >
                      Difficile
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => handleResponse(true)}
                      style={[styles.button, styles.correctButton]}
                      disabled={isTransitioning}
                    >
                      Facile
                    </Button>
                  </View>
                </>
              ) : (
                <Button
                  mode="contained"
                  onPress={handleShowAnswer}
                  style={styles.button}
                  disabled={isTransitioning}
                >
                  Voir la réponse
                </Button>
              )}
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Stats Info */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Paragraph style={styles.infoText}>
              Évaluez honnêtement votre connaissance de la réponse. Cela aide 
              l'algorithme à optimiser vos révisions.
            </Paragraph>
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
  moduleTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  question: {
    fontSize: 20,
    marginBottom: 24,
  },
  responseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    marginTop: 8,
  },
  correctButton: {
    backgroundColor: '#4caf50',
    flex: 1,
    marginLeft: 8,
  },
  incorrectButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginRight: 8,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
    backgroundColor: '#f8f8f8',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default SRSReviewScreen;