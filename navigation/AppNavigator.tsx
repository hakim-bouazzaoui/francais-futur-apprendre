import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import LessonsScreen from '../screens/Lessons/LessonsScreen';
import RevisionScreen from '../screens/Revision/RevisionScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ContentListScreen from '../screens/ContentListScreen';
import type { MainTabParamList } from './types';
import { theme } from '../constants/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          title: 'Leçons',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentListScreen}
        options={{
          title: 'Contenu',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-grid" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Revision"
        component={RevisionScreen}
        options={{
          title: 'Révision',
          tabBarIcon: ({ color, size }) => (
            <Icon name="refresh" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;