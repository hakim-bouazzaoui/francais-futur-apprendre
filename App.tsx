import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, LogBox, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, ActivityIndicator, Surface } from 'react-native-paper';
import { logger } from './services/logger';
import { initializeApp, monitorAppHealth } from './services/startupManager';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './constants/theme';

if (__DEV__) {
  LogBox.ignoreLogs([
    'Requiring module "node_modules/expo/AppEntry.js"',
    'Possible Unhandled Promise Rejection',
  ]);
}

interface StartupInfo {
  envInfo?: {
    expoVersion: string;
    appVersion: string;
    buildType: string;
  };
  configTests?: Record<string, boolean>;
  summary?: {
    duration: number;
    loadedFiles: number;
    errors: number;
    warnings: number;
  };
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [startupInfo, setStartupInfo] = useState<StartupInfo | null>(null);

  useEffect(() => {
    startApp();
    return () => {
      logger.info('App cleanup');
    };
  }, []);

  const startApp = async () => {
    try {
      logger.info('Starting app');
      const result = await initializeApp();
      
      if (!result.success) {
        logger.error('Initialization failed', { error: result.error });
        setError(result.error || 'Initialization failed');
        return;
      }

      setStartupInfo(result);
      setIsReady(true);

      if (__DEV__) {
        monitorAppHealth();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      logger.error('Fatal startup error', { error: errorMessage });
      setError(errorMessage);
    }
  };

  const toggleDebug = useCallback(() => setShowDebug(prev => !prev), []);

  const DebugOverlay: React.FC = () => (
    <Surface style={styles.debugOverlay}>
      <ScrollView style={styles.debugScroll}>
        <Pressable onPress={toggleDebug} style={styles.debugContent}>
          <Text style={styles.debugTitle}>Debug Info</Text>
          
          {/* Environment Info */}
          {startupInfo?.envInfo && (
            <View style={styles.debugSection}>
              <Text style={styles.debugSubtitle}>Environment</Text>
              <Text style={styles.debugText}>Expo: v{startupInfo.envInfo.expoVersion}</Text>
              <Text style={styles.debugText}>App: v{startupInfo.envInfo.appVersion}</Text>
              <Text style={styles.debugText}>Mode: {startupInfo.envInfo.buildType}</Text>
            </View>
          )}

          {/* Config Tests */}
          {startupInfo?.configTests && (
            <View style={styles.debugSection}>
              <Text style={styles.debugSubtitle}>Configuration Tests</Text>
              {Object.entries(startupInfo.configTests).map(([test, passed]) => (
                <Text 
                  key={test} 
                  style={[styles.debugText, !passed && styles.debugError]}
                >
                  {test}: {passed ? '✅' : '❌'}
                </Text>
              ))}
            </View>
          )}

          {/* Performance Summary */}
          {startupInfo?.summary && (
            <View style={styles.debugSection}>
              <Text style={styles.debugSubtitle}>Performance</Text>
              <Text style={styles.debugText}>
                Startup Time: {startupInfo.summary.duration}ms
              </Text>
              <Text style={styles.debugText}>
                Loaded Files: {startupInfo.summary.loadedFiles}
              </Text>
              <Text style={[
                styles.debugText,
                startupInfo.summary.errors > 0 && styles.debugError
              ]}>
                Errors: {startupInfo.summary.errors}
              </Text>
              <Text style={[
                styles.debugText,
                startupInfo.summary.warnings > 0 && styles.debugWarning
              ]}>
                Warnings: {startupInfo.summary.warnings}
              </Text>
            </View>
          )}

          {/* Errors */}
          {error && (
            <View style={styles.debugSection}>
              <Text style={styles.debugSubtitle}>Error</Text>
              <Text style={styles.debugError}>{error}</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </Surface>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorDetails}>
          Check the debug overlay for details.
        </Text>
        {__DEV__ && <DebugOverlay />}
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>
          Initializing app...
        </Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          {__DEV__ && showDebug && <DebugOverlay />}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  errorDetails: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  debugOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    maxWidth: '90%',
    maxHeight: '80%',
    elevation: 5,
  },
  debugScroll: {
    maxHeight: '100%',
  },
  debugContent: {
    padding: 15,
  },
  debugSection: {
    marginBottom: 15,
  },
  debugTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  debugSubtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    opacity: 0.9,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 3,
    opacity: 0.8,
  },
  debugError: {
    color: '#ff4444',
  },
  debugWarning: {
    color: '#ffbb33',
  },
});
