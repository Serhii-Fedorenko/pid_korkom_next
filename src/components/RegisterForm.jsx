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
      <input
        type="text"
        name="name"
        placeholder="ім'я"
        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
      ></input>
      <input
        type="text"
        name="email"
        placeholder="пошта"
        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
      ></input>
      <input
        type="password"
        name="password"
        placeholder="пароль"
        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
      ></input>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Зареєструватися
      </button>
    </form>
  );
}
