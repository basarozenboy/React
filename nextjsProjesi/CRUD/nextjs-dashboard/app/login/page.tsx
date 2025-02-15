"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await fetch("http://localhost:9080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: "b" }),
      credentials: "include", // 🔹 Allow cookies
    });

    if (res.ok) router.push("/dashboard");
    else alert("Signup failed");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-4 shadow-lg w-96">
        <h2 className="text-center text-xl font-bold mb-4">Log In</h2>
        <div className="mb-3">
          <label className="block mb-1">Username</label>
          <InputText
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password</label>
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            placeholder="Enter password"
            toggleMask
          />
        </div>
        <Button label="Log In" className="w-full" onClick={handleSignup} />
      </Card>
    </div>
  );
}
