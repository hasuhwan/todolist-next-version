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

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = ReturnType<RootStore["dispatch"]>;
const wrapper = createWrapper<RootStore>(makeStore);
export default wrapper;
