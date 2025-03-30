import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter, Stack } from "expo-router";
import BackHeader from "@/src/components/BackHeader";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUserName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle sign-up process
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({ username, emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle email verification
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 px-6">
        <View className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Verify your email
          </Text>
          <TextInput
            value={code}
            placeholder="Enter verification code"
            onChangeText={setCode}
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-gray-700"
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            className="w-full bg-green-600 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <BackHeader headerTitle="Create Account"/>
      <View className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <Text className="text-3xl font-bold text-gray-800 text-center mb-4">
          Sign Up
        </Text>

        <Text className="text-gray-600 text-center mb-6">
          Create an account to start balancing your expenses
        </Text>

        {/* Username Input */}
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Enter username"
          onChangeText={setUserName}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-700"
        />

        {/* Email Input */}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-gray-700"
        />

        {/* Password Input */}
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={setPassword}
          className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-gray-700"
        />

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={onSignUpPress}
          className="w-full bg-blue-600 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/sign-in">
            <Text className="text-blue-600 font-semibold">Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
