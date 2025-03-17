import Container from "../component/container.tsx"
import Header from "../component/header.tsx"

export function Expenses() {
  return (
    <Container>
      <Header title="Expenses" />
      <text>Welcome to Spendee!</text>
    </Container>
  );
}

export default Expenses;