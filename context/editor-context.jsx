"use client";

import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export default function EditorContextProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [hero, setHero] = useState(null);
  const [theme, setTheme] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);


  const addElement = (index, element, applyPageTheme) => {
    setElements((prev) => {
      const newElements = [...prev];
      if (applyPageTheme) {
        element.extraAttributes = {
          ...element.extraAttributes,
          theme: theme?.name,
        };
      }
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const updateElement = (id, updatedElement) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updatedElement } : el)),
    );
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const updateHero = (newHero) => {
    setHero(newHero); // Directly set new hero, no need for unnecessary function wrapping
  };

  return (
    <EditorContext.Provider
      value={{
        hero,
        setHero,
        elements,
        setElements,
        theme,
        setTheme,
        selectedElement,
        setSelectedElement,
        addElement,
        updateElement,
        removeElement,
        updateHero,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

// "use client";

// import { createContext, useState } from "react";

// export const EditorContext = createContext(null);

// export default function EditorContextProvider({ children }) {
//   const [elements, setElements] = useState([]);
//   const [hero, setHero] = useState([]);
//   const [theme, setTheme] = useState("");
//   const [selectedElement, setSelectedElement] = useState(null);

//   const addElement = (index, element, applyPageTheme) => {
//     if (applyPageTheme) {
//       element.extraAttributes.theme = theme.name; // Apply page current theme to new created element
//     }
//     setElements((prev) => {
//       const newElements = [...prev];
//       newElements.splice(index, 0, element);

//       return newElements;
//     });
//   };

//   const updateElement = (id, element) => {
//     setElements((prev) => {
//       const newElements = [...prev];
//       const index = newElements.findIndex((el) => el.id === id);
//       newElements[index] = element;

//       return newElements;
//     });
//   };

//   const removeElement = (id) => {
//     setElements((prev) => prev.filter((elements) => elements.id !== id));
//   };

//   const updateHero = (element) => {
//     setHero((prev) => {
//       const newElements = element;
//       return newElements;
//     });
//   };

//   return (
//     <EditorContext.Provider
//       value={{
//         hero,
//         setHero,
//         elements,
//         setElements,
//         theme,
//         setTheme,
//         selectedElement,
//         setSelectedElement,
//         addElement,
//         updateElement,
//         removeElement,
//         updateHero,
//       }}
//     >
//       {children}
//     </EditorContext.Provider>
//   );
// }
