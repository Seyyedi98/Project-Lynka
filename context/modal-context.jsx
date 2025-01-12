"use client";

import { createContext, useState } from "react";

export const DiologContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isDiologOpen, setIsDiologOpen] = useState(false);

  const openWorkspaceMenu = () => {
    setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
  };

  return (
    <DiologContext.Provider
      value={{
        isWorkspaceMenuOpen,
        setIsWorkspaceMenuOpen,
        isDiologOpen,
        setIsDiologOpen,
      }}
    >
      {children}
    </DiologContext.Provider>
  );
}
