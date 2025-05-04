import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

import { CurrencyProvider } from "@/src/context/currencyContext";

import { enableScreens } from 'react-native-screens';

import '@/global.css';

enableScreens();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <AuthHandler />
    </ClerkProvider>
  );
}

function AuthHandler() {
  const { isSignedIn } = useAuth();

  if (isSignedIn === undefined) {
    return null;
  }

  return (
    <CurrencyProvider>
        <Slot />
    </CurrencyProvider>
  );
}