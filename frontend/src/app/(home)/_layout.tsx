import NavigationBar from '@/src/components/navigation/NavigationBar';
import SignOutScreen from '@/src/components/features/settings/SignOutScreen';     
import { UserProvider } from '@/src/context/userContext';
import { TransactionsProvider } from '@/src/context/transactionsContext';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function HomeLayout() {
  return (
    <View className="flex-1 bg-gray-100">
      <SignedIn>
        <UserProvider>
          <TransactionsProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </TransactionsProvider>
        </UserProvider>
        <NavigationBar />
      </SignedIn>
      <SignedOut>
        <SignOutScreen />
      </SignedOut>
    </View>
  );
}