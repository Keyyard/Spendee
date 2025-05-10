
import { BodyText, Heading, Section } from "@/src/components/atoms";
import type { User } from "@/src/types/User";

export default function Welcome({ user }: { user: User | null | undefined }) {
    return (
        <Section>
            <Heading level={2} className="text-gray-800">
                Hi, {user?.username} 👋
            </Heading>
            <BodyText className="text-lg text-gray-600 mt-2">
                Let's Spendee track for you.
            </BodyText>
        </Section>
    );
}
