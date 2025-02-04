"use client";

import { createContext, useState } from "react";

export const DiologContext = createContext();

export default function ModalContextProvider({ children }) {
  // Use an object to store the state of multiple modals
  const [modalStates, setModalStates] = useState({});

  // Function to toggle a specific modal by its ID
  const toggleMenu = (modalId) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: !prevStates[modalId],
    }));
  };

  // Function to close all menus
  const closeMenu = () => {
    setModalStates({});
    // setModalStates((prevStates) => ({
    //   ...prevStates,
    //   [modalId]: false,
    // }));
  };

  // Function to open a specific modal by its ID
  const openMenu = (modalId) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: true,
    }));
  };

  // Function to check if a specific modal is open by its ID
  const isSpecificModalOpen = (modalId) => {
    return modalStates[modalId] || false;
  };

  const isAnyMenuOpen = () => {
    return Object.values(modalStates).some((isOpen) => isOpen);
  };

  // Function to set the state of a specific modal by its ID
  const setMenuOpen = (modalId, isOpen) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [modalId]: isOpen,
    }));
  };

  return (
    <DiologContext.Provider
      value={{
        isSpecificModalOpen, // Function to check if a modal is open
        setMenuOpen, // Function to set the state of a modal
        toggleMenu, // Function to toggle a modal
        closeMenu, // Function to close a modal
        openMenu, // Function to open a modal
        isAnyMenuOpen, // New function to check if any modal is open
      }}
    >
      {children}
    </DiologContext.Provider>
  );
}
