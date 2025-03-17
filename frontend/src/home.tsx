import { useQuery } from "@tanstack/react-query";
import Container from "../component/container.tsx";
import Header from "../component/header.tsx";

export function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await fetch("http://192.168.10.75:8080");
      return res.json();
    },
  });

  return (
    <Container>
      <Header title="Home" />
      {isLoading && <text>Loading...</text>}
      {error && <text>Error fetching data</text>}
      {data && <text>{data.message}</text>}
    </Container>
  );
}

export default Home;
