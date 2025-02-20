"use client";
import React from "react";
import { Form, useForm } from "react-hook-form";
import CustomerForm from "@/app/components/CustomerForm";
import { useAddUser } from "@/app/hooks/useFetch";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const {
    formState: { errors },
  } = useForm();

  const router = useRouter(); // Initialize the Next.js router
  const pathname = usePathname(); // Get the current URL path
  const addUser = useAddUser();
  const parentPath = pathname.substring(0, pathname.lastIndexOf("/")) || "/";

  const handleCreateUser = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
  }) => {
    try {
      const response = await addUser(data);
      if (!response) return;

      router.push(`${parentPath}`);
      console.log("Customer added successfully!");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="card">
      <CustomerForm onSubmit={handleCreateUser} />
    </div>
  );
}
