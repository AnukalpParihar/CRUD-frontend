import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//loginUser User
export const loginUser = createAsyncThunk("loginUser", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk("logout", async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/logout", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
});




// Create a slice of the Redux store for managing user data
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        state.users = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.users = action.payload.data
        // state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        state.users = action.payload.data;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.users = action.payload.data
        // state.error = action.error.message;
      })

  },
});


export default userSlice.reducer;
