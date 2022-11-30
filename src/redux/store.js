import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import todoActionSlice from "./todoActionSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      todoAction: todoActionSlice.reducer,
    },
  });
};
const wrapper = createWrapper(makeStore);
export default wrapper;
