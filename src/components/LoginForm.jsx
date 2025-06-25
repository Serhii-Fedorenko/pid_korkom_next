"use client";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";

export default function LoginForm() {
  const { login } = useAuth();
  const {closeModal} = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const userData = await res.json();
      login(userData); 
      closeModal?.(); 
    } else {
      alert("Помилка логіну");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="email"
        placeholder="пошта"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
      ></input>
      <input
        type="password"
        name="password"
        placeholder="пароль"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
      ></input>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Увійти
      </button>
    </form>
  );
}
