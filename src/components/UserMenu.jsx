"use client";

import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const { user,isAdmin, isAuthenticated, logout } = useAuth();
  const { openModal } = useModal();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <>
          {isAdmin && (
            <Link href="/admin" className="hover:underline">
              Dashboard
            </Link>
          )}
          <span className="text-gray-800">Привіт, {user.name}</span>
          <button onClick={logout} className="text-red-500 hover:underline">
            Вийти
          </button>
        </>
      ) : (
        <button
          onClick={() => openModal("login")}
          className="text-white-600 hover:underline"
        >
          Увійти
        </button>
      )}
    </div>
  );
}
