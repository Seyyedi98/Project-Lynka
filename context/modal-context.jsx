"use client";

import { createContext, useState } from "react";

export const DiologContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
  };

  const closeMenu = () => {
    setIsWorkspaceMenuOpen(false);
  };

  const openMenu = () => {
    setIsWorkspaceMenuOpen(true);
  };

  return (
    <DiologContext.Provider
      value={{
        isWorkspaceMenuOpen,
        setIsWorkspaceMenuOpen,
        toggleMenu,
        closeMenu,
        openMenu,
      }}
    >
      {children}
    </DiologContext.Provider>
  );
}
