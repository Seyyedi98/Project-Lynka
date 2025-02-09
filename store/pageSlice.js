// redux/slices/pageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
  hero: null,
  theme: "",
  selectedElement: null,
  metadata: "",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setHero: (state, action) => {
      state.hero = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    addElement: (state, action) => {
      const { index, element, applyPageTheme } = action.payload;
      if (applyPageTheme) {
        element.extraAttributes = {
          ...element.extraAttributes,
          theme: state.theme?.name,
        };
      }
      state.elements.splice(index, 0, element);
    },
    updateElement: (state, action) => {
      const { id, updatedElement } = action.payload;

      const index = state.elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...updatedElement };
      }
    },
    removeElement: (state, action) => {
      const id = action.payload;
      state.elements = state.elements.filter((el) => el.id !== id);
    },
    setInitialState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setHero,
  setMetadata,
  setTheme,
  setSelectedElement,
  addElement,
  updateElement,
  removeElement,
  setInitialState,
} = pageSlice.actions;

export default pageSlice.reducer;
