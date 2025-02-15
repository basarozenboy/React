"use client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFetchData, useDeleteUser, fetcher } from "@/app/hooks/useFetch";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import React from "react";

export default function App() {
  const router = useRouter();
  const pathname = usePathname();
  const deleteUser = useDeleteUser();
  const { data } = useFetchData<user[]>("http://localhost:9080/api/v1/Users");

  // 🔹 Fetch user authentication status
  const {
    data: user,
    error,
    isLoading,
  } = useSWR("http://localhost:9080/api/me", fetcher);

  // 🔹 Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); // Redirect to login page
    }
  }, [user, isLoading, router]);

  // 🔹 Show loading state while checking authentication
  if (isLoading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  // 🔹 Prevent rendering if user is not authenticated (avoids flickering)
  if (!user) return null;

  async function handleRemove(id: any): Promise<void> {
    try {
      console.log("Removing user with id:", id);
      await deleteUser(`http://localhost:9080/api/v1/Users/${id}`);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }

  async function handleUpdate(id: any): Promise<void> {
    router.push(`${pathname}/${id}/edit`);
  }

  const goToAddCustomer = () => {
    router.push(`${pathname}/addCustomer`);
  };

  return (
    <>
      <div className="card text-left p-4">
        <Button
          onClick={goToAddCustomer}
          className="px-5 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          label="Add Customer"
        />
      </div>
      <div className="card">
        <DataTable
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          value={data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="id" header="Id"></Column>
          <Column field="firstName" header="First Name"></Column>
          <Column field="lastName" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column
            header="Actions"
            body={(rowData) => (
              <Button
                className="mr-1 p-button-danger"
                onClick={() => handleRemove(rowData.id)}
              >
                Remove
              </Button>
            )}
          ></Column>
          <Column
            header="Actions"
            body={(rowData) => (
              <Button
                className="mr-1 p-button"
                onClick={() => handleUpdate(rowData.id)}
              >
                Update
              </Button>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}
