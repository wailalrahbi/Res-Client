import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./Features/StaffSlice";
import itemsReducer from "./Features/MenuSlice";
import ordersReducer from "./Features/OrderSlice";
import cartReducer from "./Features/CartSlice";
import { loadState, saveState } from "./LocalStorage";

// Load the saved state
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    staffs: staffReducer,
    items: itemsReducer,
    orders: ordersReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  // Get the current state
  const state = store.getState();

  //   new state object
  const stateToSave = {
    ...state,
    staffs: undefined, //exclude the staffs slice
  };

  saveState(stateToSave);
});
