"use client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFetchData, useDeleteUser } from "@/app/hooks/useFetch";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function App() {
  const deleteUser = useDeleteUser();
  const { data } = useFetchData<user[]>("http://localhost:9080/api/v1/Users");

  async function handleRemove(id: any): Promise<void> {
    try {
      console.log("Removing user with id:", id);
      console.log(`http://localhost:9080/api/v1/Users/${id}`);
      await deleteUser(`http://localhost:9080/api/v1/Users/${id}`);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }

  async function handleUpdate(id: any): Promise<void> {
    router.push(`${pathname}/${id}/edit`);
  }

  const router = useRouter(); // Initialize the Next.js router
  const pathname = usePathname(); // Get the current URL path

  // Function to handle button click and navigate to the add customer page
  const goToAddCustomer = () => {
    router.push(`${pathname}/addCustomer`); // Append "addCustomer" to the current path
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
