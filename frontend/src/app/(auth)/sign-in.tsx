import BackHeader from "@/src/components/navigation/BackHeader";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Input, Button, Heading, BodyText, Section } from "@/src/components/atoms";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };


  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
        <BackHeader headerTitle="Sign In" />
      <View className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <Heading level={1} className="text-center mb-4">Sign in</Heading>

        <Input
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email or username"
          onChangeText={setEmailAddress}
          className="mb-4 text-gray-700"
        />

        {/* Password Input */}
        <Input
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={setPassword}
          className="mb-6 text-gray-700"
        />

        {/* Sign In Button */}
        <Button
          title="Continue"
          onPress={onSignInPress}
          className="mb-2"
        />

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/sign-up">
            <Text className="text-blue-600 font-semibold">Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
