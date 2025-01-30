"use client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFetchData, useDeleteUser } from "@/app/hooks/useFetch";
import React, { useState, useEffect } from "react";

export default function App() {
  const { data } = useFetchData<user[]>("http://localhost:9080/api/v1/Users");

  async function handleRemove(id: any): Promise<void> {
    try {
      // await useDeleteUser(`http://localhost:9080/api/v1/Users/${id}`);
      fetch(`http://localhost:9080/api/v1/Users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
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
          </DataTable>
        </div>
      </main>
    </>
  );
}
