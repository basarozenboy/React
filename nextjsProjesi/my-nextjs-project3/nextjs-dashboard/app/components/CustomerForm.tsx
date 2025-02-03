"use client";

import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext"; // Assuming you're using PrimeReact
import { Button } from "primereact/button";

interface CustomerFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  isLoading?: boolean;
  defaultValues?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ firstName: string; lastName: string; email: string }>({
    defaultValues, // Set default values for the form
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg space-y-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Add/Update Customer
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <InputText
          type="text"
          placeholder="First Name"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          {...register("firstName", { required: "First name is required" })}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">
            {errors.firstName.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          Last Name
        </label>
        <InputText
          type="text"
          placeholder="Last Name"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">
            {errors.lastName.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <InputText
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add/Update Customer"}
      </Button>
    </form>
  );
};

export default CustomerForm;
