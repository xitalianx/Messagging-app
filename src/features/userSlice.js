import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = null;
    },
  },
});

export const login = (user) => async (dispatch) => {
  dispatch({ type: "LOGIN", payload: user });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const selectUser = (state) => state.user;


const initialState = null;
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
