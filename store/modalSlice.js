import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalStates: {},
  },
  reducers: {
    toggleMenu: (state, action) => {
      const modalId = action.payload;
      state.modalStates[modalId] = !state.modalStates[modalId];
    },

    closeMenu: (state) => {
      state.modalStates = {};
    },

    openMenu: (state, action) => {
      const modalId = action.payload;
      state.modalStates[modalId] = true;
    },

    setMenuOpen: (state, action) => {
      const { modalId, isOpen } = action.payload;
      state.modalStates[modalId] = isOpen;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu, setMenuOpen } =
  modalSlice.actions;

// Selector to check if a specific modal is open by its ID
export const isSpecificModalOpen = (modalId) => (state) => {
  return state.modal.modalStates[modalId] || false;
};

// Selector to check if any modal is open
export const selectIsAnyMenuOpen = (state) => {
  return Object.values(state.modal.modalStates).some((isOpen) => isOpen);
};

// Export the reducer
export default modalSlice.reducer;
