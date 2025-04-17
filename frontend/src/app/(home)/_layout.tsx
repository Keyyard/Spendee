import NavigationBar from '@/src/components/navigation/NavigationBar';
import SignOutScreen from '@/src/components/features/settings/SignOutScreen';     
import { UserProvider } from '@/src/context/userContext';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View className="flex-1 bg-gray-100">
      <SignedIn>
        <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
        <NavigationBar />
      </SignedIn>
      <SignedOut>
        <SignOutScreen />
      </SignedOut>
    </View>
  );
}