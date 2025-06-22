"use client";

import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Modal({ onClose }) {
  const [modalRoot, setModalRoot] = useState(null);
  const { isOpen, view, closeModal } = useModal();
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md sm:max-w-lg">
        {view === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>,
    modalRoot
  );
}
