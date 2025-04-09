import NavigationBar from '@/src/components/navigation/NavigationBar';
import SignOutScreen from '@/src/components/screens/settings/SignOutScreen';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View className="flex-1 bg-gray-100">
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }} />
        <NavigationBar />
      </SignedIn>
      <SignedOut>
        <SignOutScreen />
      </SignedOut>
    </View>
  );
}