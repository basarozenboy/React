"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { fetcher } from "../hooks/useFetch";

export default function DashboardPage() {
  const router = useRouter();

  const { data, error } = useSWR(
    "http://localhost:9080/api/protected",
    fetcher
  );

  if (error) return <p>Error: Unauthorized</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {data.username}!</h2>
      <Button
        onClick={async () => {
          await fetch("http://localhost:9080/api/logout", {
            method: "POST",
            credentials: "include",
          });
          router.push("/login");
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
