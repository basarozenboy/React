"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await fetch("http://localhost:9080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: hashedPassword }),
    });

    if (res.ok) router.push("/login");
    else alert("Signup failed");
  };

  return (
    <div>
      <h2>Signup</h2>
      <InputText
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputText
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignup}>Sign Up</Button>
    </div>
  );
}
