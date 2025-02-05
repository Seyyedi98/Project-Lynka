import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalStates: {}, // Object to store the state of multiple modals
  },
  reducers: {
    // Action to toggle a specific modal by its ID
    toggleMenu: (state, action) => {
      const modalId = action.payload;
      state.modalStates[modalId] = !state.modalStates[modalId];
    },

    // Action to close all modals
    closeMenu: (state) => {
      state.modalStates = {};
    },

    // Action to open a specific modal by its ID
    openMenu: (state, action) => {
      const modalId = action.payload;
      state.modalStates[modalId] = true;
    },

    // Action to set the state of a specific modal by its ID
    setMenuOpen: (state, action) => {
      const { modalId, isOpen } = action.payload;
      state.modalStates[modalId] = isOpen;
    },
  },
});

// Export the actions
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
