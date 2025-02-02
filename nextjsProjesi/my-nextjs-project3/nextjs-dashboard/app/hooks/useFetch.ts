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

export const useDeleteUser = () => {
  const deleteUser = async (url: string) => {
    try {
      const response = await fetch(url, { method: "DELETE" });

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

  return deleteUser;
};

export const useAddUser = () => {
  const addUser = async (userData: { firstName: string; lastName: string; email: string }) => {
    try {
      const response = await fetch("http://localhost:9080/api/v1/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Optimistically update user list
      mutate("http://localhost:9080/api/v1/Users");
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  return addUser;
};
