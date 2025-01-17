"use client";

import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export default function EditorContextProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);


  const addElement = (index, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);

      return newElements;
    });
  };

  const updateElement = (id, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;

      return newElements;
    });
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((elements) => elements.id !== id));
  };

  return (
    <EditorContext.Provider
      value={{
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        addElement,
        updateElement,
        removeElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
