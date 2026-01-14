import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../../utils/constants";

interface User {
  id: string;
  role: Role;
  email?: string;
  image?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
