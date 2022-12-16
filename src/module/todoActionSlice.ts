import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const loginRequest = createAsyncThunk(
  "todoActionSlice/loginRequest",
  async (data?: { userid: string; password: string } | "") => {
    if (data !== "") {
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

const logoutRequest = createAsyncThunk(
  "todoActionSlice/logoutRequest",
  async () => {
    try {
      const data: string = await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "api/logoutRequest")
        .then((response) => response.data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

const removeRequest = createAsyncThunk(
  "todoActionSlice/removeRequest",
  async (data: { userid: string; id: string }) => {
    try {
      const response: string = await axios
        .delete(process.env.NEXT_PUBLIC_API_URL + "api/removeRequest", {
          data: data,
        })
        .then((data) => data.data);
    } catch (e) {
      console.error(e);
    }
  }
);
export interface Iadd {
  text: string;
  userid: string;
  id: string;
}
const addRequest = createAsyncThunk(
  "todoActionSlice/addRequest",
  async (data: Iadd) => {
    const { text, userid, id } = data;
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "api/addRequest", {
          text,
          userid,
          id,
        })
        .then((data) => data);
    } catch (e) {
      console.error(e);
    }
  }
);
interface Isign {
  username: string;
  userid: string;
  password: string;
}
const signInRequest = createAsyncThunk(
  "todoActionSlice/signInRequest",
  async (data: Isign) => {
    const { username, userid, password } = data;
    try {
      const response: AxiosResponse = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "api/signInRequest", {
          username,
          userid,
          password,
        })
        .then((data) => data);
      return response;
    } catch (e) {
      return "";
    }
  }
);
interface ItodoInitial {
  id?: string;
  text?: string;
}
interface IUserInitial {
  username: string;
  userid: string;
  todo: ItodoInitial[];
}
const initialState: IUserInitial = {
  username: "",
  userid: "",
  todo: [],
};
const todoActionSlice = createSlice({
  name: "todoActionSlice",
  initialState,
  reducers: {
    add: (state: IUserInitial, action: PayloadAction<ItodoInitial>): void => {
      const { id, text } = action.payload;
      state.todo = state.todo.concat({ id: id, text: text });
    },
    remove: (
      state: IUserInitial,
      action: PayloadAction<ItodoInitial>
    ): void => {
      state.todo = state.todo.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginRequest.fulfilled,
      (state: IUserInitial, { payload }) => {
        if (payload !== undefined) {
          state.username = payload.username;
          state.todo = payload.todo;
          state.userid = payload.userid;
        }
      }
    );
  },
});
export const { add, remove } = todoActionSlice.actions;
export default todoActionSlice;
export {
  loginRequest,
  removeRequest,
  addRequest,
  signInRequest,
  logoutRequest,
};
