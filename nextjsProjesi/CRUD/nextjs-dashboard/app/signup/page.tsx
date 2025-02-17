"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useRouter } from "next/navigation";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

type RoleOption = {
  id: string;
  name: string;
};

const roleOptions: RoleOption[] = [
  { id: "admin", name: "Admin" },
  { id: "user", name: "User" },
];

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    const res = await fetch("http://localhost:9080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) router.push("/login");
    else alert("Signup failed");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Sign Up" className="w-96 shadow-lg p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <InputText
              {...register("firstName", { required: "First Name is required" })}
              className={classNames("w-full", {
                "p-invalid": errors.firstName,
              })}
            />
            {errors.firstName && (
              <small className="p-error">{errors.firstName.message}</small>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <InputText
              {...register("lastName", { required: "Last Name is required" })}
              className={classNames("w-full", { "p-invalid": errors.lastName })}
            />
            {errors.lastName && (
              <small className="p-error">{errors.lastName.message}</small>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <InputText
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              className={classNames("w-full", { "p-invalid": errors.email })}
            />
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <InputText
              {...register("username", { required: "Username is required" })}
              className={classNames("w-full", { "p-invalid": errors.username })}
            />
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <Dropdown
              options={roleOptions}
              optionLabel="name"
              optionValue="id"
              placeholder="Select a Role"
              {...register("role", { required: "Role is required" })}
              className={classNames("w-full", { "p-invalid": errors.role })}
            />
            {errors.role && (
              <small className="p-error">{errors.role.message}</small>
            )}
          </div>
          <Button type="submit" label="Sign Up" className="w-full" />
        </form>
      </Card>
    </div>
  );
}
