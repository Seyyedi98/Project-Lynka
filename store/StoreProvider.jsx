"use client";

// ! Important
// Makes entire wrapped layout client side

import { Provider } from "react-redux";
import { store } from "./store";

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
