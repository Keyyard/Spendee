import { Text, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

import { SignOutButton } from "../../buttons/SignOutButton";

export default function SettingsScreen( { user } : { user: any | null | undefined}) {
    return (
        <>
        <Text className="text-xl font-semibold text-gray-800">
          Welcome, {user?.username}
        </Text>
          <SignOutButton/>
        </>
    )
}
