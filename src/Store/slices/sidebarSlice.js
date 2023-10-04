// sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
};

// Create a Redux Toolkit slice
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      // console.log(action.payload)
      state.sidebarShow = action.payload;
    },
  },
});

export const { setSidebarShow } = sidebarSlice.actions;
export default sidebarSlice.reducer;

