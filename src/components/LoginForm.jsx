"use client";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";

export default function LoginForm() {
  const { login } = useAuth();
  const { closeModal } = useModal();

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
        required
        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="password"
        name="password"
        placeholder="пароль"
        required
        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        Увійти
      </button>
    </form>
  );
}
