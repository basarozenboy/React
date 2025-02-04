import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        const errorData = await response.json(); // Parse the error response
        toast.error(errorData.message);
        return false; // Return false on error
      }

      // Optimistically update user list
      mutate("http://localhost:9080/api/v1/Users");
      return true;
    } catch (error) {
        throw error;
    }
  };

  return addUser;
};

  export const useUpdateUser = ({ customerID }: { customerID: string }) => {
  const updateUser = async (userData: { firstName: string; lastName: string; email: string }) => {
    try {
      const response = await fetch(`http://localhost:9080/api/v1/Users/${customerID}`, {
        method: "PUT", // Using PUT to update the existing user
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Optimistically update the user list
      mutate("http://localhost:9080/api/v1/Users");
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  return updateUser;
};
