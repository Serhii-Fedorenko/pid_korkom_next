"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, children }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));

    const handleEscape = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md sm:max-w-lg">
        {children}
      </div>
    </div>,
    modalRoot
  );
}
