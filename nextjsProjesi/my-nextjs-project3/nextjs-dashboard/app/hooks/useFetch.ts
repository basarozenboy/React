import useSWR, { mutate } from "swr";

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

export const useDeleteUser = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Optimistically update the cache after deleting
      mutate("http://localhost:9080/api/v1/Users");
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
};
