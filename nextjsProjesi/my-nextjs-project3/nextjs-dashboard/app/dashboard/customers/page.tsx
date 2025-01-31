"use client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFetchData, useDeleteUser, useAddUser } from "@/app/hooks/useFetch";
import React, { useState, useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { log } from "console";
import { Input } from "postcss";
import { InputText } from "primereact/inputtext";
import CustomerForm from "@/app/components/CustomerForm";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await addUser(data);
      console.log("User added successfully!");
    } catch (error) {
      console.log("Error: Unable to add user");
    } finally {
      console.log(false);
    }
  };

  const { data } = useFetchData<user[]>("http://localhost:9080/api/v1/Users");
  const addUser = useAddUser();
  const deleteUser = useDeleteUser();

  async function handleRemove(id: any): Promise<void> {
    try {
      console.log("Removing user with id:", id);
      console.log(`http://localhost:9080/api/v1/Users/${id}`);
      await deleteUser(`http://localhost:9080/api/v1/Users/${id}`);
      //fetch(`http://localhost:9080/api/v1/Users/${id}`, {
      //   method: "DELETE",
      // });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }

  const handleCreateUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      await addUser(data);
      console.log("Customer added successfully!");
    } catch (error) {
      console.log("Error adding customer");
    } finally {
      console.log(false);
    }
  };

  return (
    <>
      <div className="card">
        <CustomerForm onSubmit={handleCreateUser} />
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
        </DataTable>
      </div>
    </>
  );
}
