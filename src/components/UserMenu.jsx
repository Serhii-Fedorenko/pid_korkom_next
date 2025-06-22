"use client";
import { useModal } from "@/context/ModalContext";

export default function UserMenu() {
  const { openModal } = useModal();

  return (
    <div>
      <button
        onClick={() => openModal("login")}
        className="hover:underline cursor-pointer"
      >
        Увійти
      </button>
    </div>
  );
}
