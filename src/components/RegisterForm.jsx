"use client";
import { useAuth } from "@/lib/useAuth";
import { useState } from "react";

export default function RegisterForm() {
  const { setUser } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.message || "Помилка");
      return;
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Ім'я" required />
      <input type="email" name="email" placeholder="Пошта" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <button type="submit">Зареєструватися</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
