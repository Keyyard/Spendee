import BackHeader from "@/src/components/molecules/navigation/BackHeader";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Input } from "@/src/components/atoms";
import { Button, Heading, BodyText, Section } from "@/src/components/atoms";

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
          <Input
            value={code}
            placeholder="Enter verification code"
            onChangeText={setCode}
            className="mb-6 text-gray-700"
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
        <Heading level={1} className="text-center mb-4">Sign Up</Heading>

        <BodyText className="text-center mb-6">Create an account to start balancing your expenses</BodyText>

        {/* Username Input */}
        <Input
          autoCapitalize="none"
          value={username}
          placeholder="Enter username"
          onChangeText={setUserName}
          className="mb-4 text-gray-700"
        />

        {/* Email Input */}
        <Input
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
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

        {/* Sign Up Button */}
        <Button
          title="Continue"
          onPress={onSignUpPress}
          className="mb-2"
        />

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
