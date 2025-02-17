"use client";

import { fetcher } from "@/app/hooks/useFetch";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function AdminDashboard() {
  const { data, error } = useSWR(
    "http://localhost:9080/api/admin/dashboard",
    fetcher
  );
  const router = useRouter();

  if (error) return <p>Error: Unauthorized</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>{data.message}</p>
    </div>
  );
}
