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

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="card">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Add Customer
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-600"></label>
              <InputText
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {typeof errors.firstName?.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600"></label>
              <InputText
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {typeof errors.lastName.message === "string" &&
                    errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600"></label>
              <InputText
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {typeof errors.email.message === "string" &&
                    errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Customer
            </Button>
          </form>
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
      </main>
    </>
  );
}
