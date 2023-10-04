import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sidebarSlice from "./slices/sidebarSlice";
import thunk from "redux-thunk";
import noteSlice from "./slices/noteSlice";

const store = configureStore({
    reducer: {
      sidebar: sidebarSlice ,
      user:userSlice,
      note:noteSlice,
    },
    middleware: [thunk],
  });
  
export default store;

