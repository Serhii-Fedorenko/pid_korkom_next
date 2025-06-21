"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return {
    user,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
    setUser,
    logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        localStorage.removeItem("user");
        setUser(null);
      }
  };
}
