import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type user = {
  email: string;
  name: string;
};

interface state {
  user: user;
  isAuth: boolean;
}

const initialState: state = {
  user: {
    email: "",
    name: "",
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = { email: "", name: "" };
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
