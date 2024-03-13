import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "~/api/auth.api";
import { setUser } from "~/store/slices/userSlice";
import {
  deleteToken,
  deleteUser,
  persistToken,
  readToken,
} from "~/services/localStorage.service";
import { type LoginRequest, type LoginResponse } from "~/types/auth";

export interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: readToken(),
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { dispatch }) =>
    login(loginPayload).then((res: LoginResponse) => {
      dispatch(setUser(res));
      persistToken(res.access);

      return res.access;
    }),
);

export const doLogout = createAsyncThunk(
  "auth/doLogout",
  (payload, { dispatch }) => {
    deleteToken();
    deleteUser();
    dispatch(setUser(null));
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = "";
    });
  },
});

export default authSlice.reducer;
