import useSWR from "swr";

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom SWR hook with generics
export function useFetchData<T>(endpoint: string) {
  const { data, error, isLoading } = useSWR<T>(endpoint, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
// Custom hook for deleting a user
export function useDeleteUser(endpoint: string) {
  const { mutate } = useSWR(null, fetcher);

  fetch(endpoint, {
    method: 'DELETE',
  });
  //mutate(endpoint);

  return {
    1: 1,
  };
}