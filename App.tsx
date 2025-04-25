import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, AppState, AppStateStatus } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, ActivityIndicator, Button } from 'react-native-paper';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './constants/theme';
import { contentRegistry } from './services/contentRegistry';
import { dataSync, CONTENT_EVENTS } from './services/dataSync';
import { contentValidator, ValidationError } from './services/contentValidator';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Subscribe to content events
    dataSync.subscribe(CONTENT_EVENTS.CONTENT_ERROR, handleContentError);
    dataSync.subscribe(CONTENT_EVENTS.CONTENT_UPDATED, handleContentUpdate);

    return () => {
      subscription.remove();
      dataSync.unsubscribe(CONTENT_EVENTS.CONTENT_ERROR, handleContentError);
      dataSync.unsubscribe(CONTENT_EVENTS.CONTENT_UPDATED, handleContentUpdate);
    };
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize content registry
      await contentRegistry.initialize();
      
      // Validate all content
      const content = contentRegistry.getContent();
      const validationResult = contentValidator.validateContent(content);
      
      if (!validationResult.isValid) {
        console.warn('Content validation issues:', validationResult.errors);
        // In development, you might want to throw these errors
        if (__DEV__) {
          throw new Error(
            'Content validation failed:\n' +
            validationResult.errors.map(e => `- ${e.message}`).join('\n')
          );
        }
      }

      setIsReady(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('App initialization error:', err);
      setError(errorMessage);
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      // Check for content updates when app comes to foreground
      dataSync.checkForUpdates().catch(console.error);
    }
  };

  const handleContentError = (error: Error | ValidationError) => {
    console.error('Content error:', error);
    // In development, show errors more prominently
    if (__DEV__) {
      setError(error.message);
    }
  };

  const handleContentUpdate = () => {
    // Validate new content
    const content = contentRegistry.getContent();
    const validationResult = contentValidator.validateContent(content);
    
    if (!validationResult.isValid) {
      console.warn('Content validation issues after update:', validationResult.errors);
    }
  };

  if (error) {
    // In a real app, you'd want to show a proper error screen
    return (
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <Button mode="contained" onPress={initializeApp}>
              Réessayer
            </Button>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  if (!isReady) {
    // Show a loading screen while initializing
    return (
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Chargement du contenu...</Text>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    marginBottom: 16,
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  },
});
