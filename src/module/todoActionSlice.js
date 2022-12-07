import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginRequest = createAsyncThunk(
  "todoActionSlice/loginRequest",
  async (data) => {
    if (data !== undefined) {
      try {
        const response = await axios
          .post(process.env.NEXT_PUBLIC_API_URL + "api/loginRequest", data)
          .then((data) => data);
        const getUser = await response.data;
        return getUser;
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const response = await axios
          .get(process.env.NEXT_PUBLIC_API_URL + "api/loginRequest")
          .then((data) => data);
        const getUser = await response.data;
        return getUser;
      } catch (e) {
        console.error(e);
      }
    }
  }
);

const removeRequest = createAsyncThunk(
  "todoActionSlice/removeRequest",
  async (data) => {
    try {
      const response = await axios
        .delete(process.env.NEXT_PUBLIC_API_URL + "api/removeRequest", {
          data: data,
        })
        .then((data) => console.log(data));
    } catch (e) {
      console.error(e);
    }
  }
);
const addRequest = createAsyncThunk(
  "todoActionSlice/addRequest",
  async (data) => {
    const { todotext, userid, todoid } = data;
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "api/addRequest", {
          todotext,
          userid,
          todoid,
        })
        .then((data) => data);
    } catch (e) {
      console.error(e);
    }
  }
);
const signInRequest = createAsyncThunk(
  "todoActionSlice/signInRequest",
  async (data) => {
    const { username, userid, password } = data;
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "api/signInRequest", {
          username,
          userid,
          password,
        })
        .then((data) => console.log(data));
    } catch (e) {
      return "";
    }
  }
);

const todoActionSlice = createSlice({
  name: "todoActionSlice",
  initialState: {},
  reducers: {
    add: (state, action) => {
      const { id, todotext } = action.payload;
      state.todo = state.todo.concat({ id: id, text: todotext });
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
export { loginRequest, removeRequest, addRequest, signInRequest };
