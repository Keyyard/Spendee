import { Card, Heading, BodyText, Button } from "@/src/components/atoms";
import { Link } from "expo-router";

export default function SignOutScreen() {
  return (
    <Card className="flex-1 items-center justify-center bg-background px-6">
      <Heading level={2} className="mb-4 text-center">Welcome to Spendee</Heading>
      <BodyText className="mb-6 text-center">Manage your expenses with ease</BodyText>

      <Link href="/(auth)/sign-in" asChild>
        <Button title="Sign In" className="w-full mb-2" />
      </Link>

      <Link href="/(auth)/sign-up" asChild>
        <Button title="Sign Up" variant="success" className="w-full bg-gray-300 text-gray-800" />
      </Link>
    </Card>
  );
}
