import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    modal: modalReducer,
  },
});
