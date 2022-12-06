import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import todoActionSlice from "./todoActionSlice";
import signBooleanSlice from "./signBooleanSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      signBoolean: signBooleanSlice.reducer,
      todoAction: todoActionSlice.reducer,
    },
  });
};
const wrapper = createWrapper(makeStore);
export default wrapper;
