import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let todoId = 2;
const loginRequest = createAsyncThunk(
  "todoActionSlice/loginRequest",
  async (data) => {
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "api/loginRequest", data)
        .then((data) => data);
      const getUser = await response.data;
      return getUser;
    } catch (e) {
      console.error(e);
    }
  }
);

const todoActionSlice = createSlice({
  name: "todoActionSlice",
  initialState: {},
  reducers: {
    add: (state, action) => {
      state.todo = state.todo.concat({ id: id++, text: action.payload });
    },
    remove: (state, action) => {
      state.todo = state.todo.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        state.username = payload.username;
        state.todo = payload.todo;
        state.userid = payload.userid;
      }
    });
  },
});
export const { add, remove } = todoActionSlice.actions;
export default todoActionSlice;
export { loginRequest };
