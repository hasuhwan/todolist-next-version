import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import todoActionSlice from "./todoActionSlice";
import signBooleanSlice from "./signBooleanSlice";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch: () => AppThunkDispatch = useDispatch;
const wrapper = createWrapper<RootStore>(makeStore);
export default wrapper;
