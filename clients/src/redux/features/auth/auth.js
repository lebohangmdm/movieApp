import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

try {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo) {
    initialState.userInfo = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error("Error parsing userInfo from localStorage:", error);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const getAuth = (state) => state.auth.userInfo;
export default authSlice.reducer;
