import { configureStore } from "@reduxjs/toolkit";
import agreementsReducer from "./features/agreements/agreementsSlice";

const store = configureStore({
  reducer: {
    agreements: agreementsReducer,
  },
});

export default store;
