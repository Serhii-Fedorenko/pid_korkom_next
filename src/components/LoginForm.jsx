"use client";
import { useAuth } from "@/lib/useAuth";
import { useState } from "react";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    });

    if (!res.ok) {
      setError("Невірна пошта або пароль");
      return;
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" name="email" placeholder="Пошта" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <button type="submit">Увійти</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
