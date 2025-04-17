import Welcome from "@/src/components/features/home/Welcome";
import { useUserContext } from "@/src/context/userContext";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
export default function Settings() {
  const { user } = useUserContext();
  if (!user) {
    return <View className="flex-1 items-center justify-center"><Text>Loading...</Text></View>;
  }
  return (
    <View className="flex-1 bg-background p-4">
      <Stack.Screen options={{ headerShown: false }} />
      <Welcome user={user} />
      <Link href={"/settings/User"} className="mt-4 p-4  bg-blue-500/95 rounded-xl">
        <Text className="text-base text-white">User Settings</Text>
      </Link>
      <Link href={"/settings/Currency"} className="mt-4 p-4  bg-blue-500/95 rounded-xl">
        <Text className="text-base text-white">Currency Settings</Text>
      </Link>
      <Link href={"/settings/Categories"} className="mt-4 p-4 rounded-xl bg-blue-500/95">
        <Text className="text-base text-white">Categories Settings</Text>
      </Link>
    </View>
  );
}
