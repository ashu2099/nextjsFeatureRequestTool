"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { fetchItems } from "@/utils/api";

const queryClient = new QueryClient();

export default function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchItems,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {data.length > 0 &&
          data.map((item) => <li key={item.id}>{item.name || item.title}</li>)}
      </ul>
    </div>
  );
}
