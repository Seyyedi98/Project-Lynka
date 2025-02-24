// redux/slices/pageSlice.js
import { toast } from "@/hooks/use-toast";
import { arrayMove } from "@dnd-kit/sortable";
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
      const { index, overId, element, applyPageTheme } = action.payload;
      let newElementIndex = index;

      if (!index && overId)
        newElementIndex =
          state.elements.findIndex((el) => el.id === overId) + 1;

      if (applyPageTheme) {
        element.extraAttributes = {
          ...element.extraAttributes,
          theme: state.theme?.elementStyle,
          textColor: state.theme?.elementTextColor,
          bgColor: state.theme?.elementColor,
          borderRadius: state.theme?.borderRadius,
        };
      }

      toast({
        description: "بلوک جدید ایجاد شد",
      });
      state.elements.splice(newElementIndex, 0, element);
    },
    updateElement: (state, action) => {
      const { id, updatedElement } = action.payload;

      const index = state.elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...updatedElement };
      }
    },
    sortElement: (state, action) => {
      const { active, over, elements } = action.payload;

      const oldIndex = elements.findIndex((element) => element.id === active);
      const newIndex = elements.findIndex((element) => element.id === over);
      const newElemetns = arrayMove(elements, oldIndex, newIndex);
      state.elements = newElemetns;
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
  updateElements,
  removeElement,
  setInitialState,
} = pageSlice.actions;

export default pageSlice.reducer;
