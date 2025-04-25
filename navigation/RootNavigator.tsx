import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import LessonDetailScreen from '../screens/Lessons/LessonDetailScreen';
import QuizScreen from '../screens/Quiz/QuizScreen';
import QuizResultsScreen from '../screens/Quiz/QuizResultsScreen';
import SRSReviewScreen from '../screens/Revision/SRSReviewScreen';
import ContentTestScreen from '../screens/ContentTestScreen';
import ContentSyncTestScreen from '../screens/ContentSyncTestScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={AppNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={({ route }) => ({
          title: 'Leçon',
          headerTintColor: '#0055A4',
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={({ route }) => ({
          title: 'Quiz',
          headerTintColor: '#0055A4',
          // Prevent going back during quiz
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="QuizResults"
        component={QuizResultsScreen}
        options={({ route }) => ({
          title: 'Résultats',
          headerTintColor: '#0055A4',
          // Prevent going back to quiz
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="SRSReview"
        component={SRSReviewScreen}
        options={({ route }) => ({
          title: 'Révision',
          headerTintColor: '#0055A4',
          // Prevent going back during review
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name="ContentTest"
        component={ContentTestScreen}
        options={{
          title: 'Test du Contenu',
          headerTintColor: '#0055A4',
          // Only show in development
          presentation: __DEV__ ? 'card' : 'none',
        }}
      />
      <Stack.Screen
        name="ContentSyncTest"
        component={ContentSyncTestScreen}
        options={{
          title: 'Test de Synchronisation',
          headerTintColor: '#0055A4',
          // Only show in development
          presentation: __DEV__ ? 'card' : 'none',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;