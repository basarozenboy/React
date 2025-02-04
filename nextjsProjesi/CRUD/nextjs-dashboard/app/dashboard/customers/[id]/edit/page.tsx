"use client";
import CustomerForm from "@/app/components/CustomerForm";
import { useFetchData, useUpdateUser } from "@/app/hooks/useFetch";
import { useParams, usePathname, useRouter } from "next/navigation";

function getParent(pathname: string) {
  return {
    parentPath: pathname.substring(0, pathname.lastIndexOf("/")) || "/",
  };
}

export default function Page() {
  const params = useParams(); // useParams() returns a resolved params object
  const id = params.id as string; // Extracting customerID
  const updateUser = useUpdateUser({ customerID: id });
  const pathname = usePathname(); // Get the current URL path
  let parentPath = getParent(pathname).parentPath;
  parentPath = getParent(parentPath).parentPath;
  const router = useRouter(); // Initialize the Next.js router

  const { data } = useFetchData<user>(
    `http://localhost:9080/api/v1/Users/${id}`
  );
  if (!data) return <p>Loading...</p>;
  console.log({ data });

  const handleUpdateUser = (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      updateUser(data);
      console.log("Customer added successfully!");
    } catch (error) {
      console.log("Error adding customer");
    } finally {
      console.log(false);
    }
    router.push(`${parentPath}`);
  };

  return (
    <div className="card">
      {
        <CustomerForm
          onSubmit={handleUpdateUser}
          defaultValues={{
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
          }}
        />
      }
    </div>
  );
}
