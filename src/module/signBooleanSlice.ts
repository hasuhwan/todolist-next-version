import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialBool {
  bool: boolean;
}
const initialState: initialBool = { bool: false };
const signBooleanSlice = createSlice({
  name: "signBooleanSlice",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      const bool = action.payload;
      state.bool = !bool;
    },
  },
});
export const { toggle } = signBooleanSlice.actions;
export default signBooleanSlice;
