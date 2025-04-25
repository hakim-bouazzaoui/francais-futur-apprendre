import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './constants/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Create a custom theme that extends the default theme
const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    surface: theme.colors.surface,
    text: theme.colors.text,
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // TODO: Add font files to assets/fonts and uncomment this
        // await Font.loadAsync({
        //   'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
        //   'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        //   'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
        //   'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        // });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
