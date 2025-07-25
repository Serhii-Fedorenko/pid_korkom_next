"use client";

import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Modal({ onClose }) {
  const [modalRoot, setModalRoot] = useState(null);
  const { isOpen, view, closeModal, toggleModal } = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setModalRoot(document.getElementById("modal-root"));

    const handleEscape = (e) => {
      if (e.code === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade">
      <div className="relative bg-white border border-black rounded-xl px-6 py-10 w-full max-w-md sm:max-w-lg shadow-none">
      <button
          onClick={closeModal}
          aria-label="Закрити"
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black focus:outline-none"
        >
          &times;
        </button>
        {view === "login" ? <LoginForm /> : <RegisterForm />}
        <button
          onClick={toggleModal}
          className="w-full mt-6 text-sm text-black underline hover:opacity-70 transition"
        >
          {view === "login" ? "Ще немає акаунту?" : "Вже є акаунт?"}
        </button>
      </div>
    </div>,
    modalRoot
  );
}
