import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import LessonDetailScreen from '../screens/Lessons/LessonDetailScreen';
import QuizScreen from '../screens/Quiz/QuizScreen';
import QuizResultsScreen from '../screens/Quiz/QuizResultsScreen';
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
    </Stack.Navigator>
  );
};

export default RootNavigator;