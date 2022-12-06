import { createSlice } from "@reduxjs/toolkit";
const signBooleanSlice = createSlice({
  name: "signBooleanSlice",
  initialState: { bool: false },
  reducers: {
    toggle: (state, action) => {
      const { bool } = action.payload;
      state.bool = !bool;
    },
  },
});
export const { toggle } = signBooleanSlice.actions;
export default signBooleanSlice;
