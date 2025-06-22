"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("login");

  const openModal = (viewName) => {
    setView(viewName);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, view, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
