import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get all users
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/user/", {
      headers: {
        authorization: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      },
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
});

//get single user
export const getSingleUser = createAsyncThunk("getSingleUser", async (_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/user/${_id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        },
      }
    );
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
});
//add user
export const addUser = createAsyncThunk("addUser", async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/api/user/", user, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response;
  } catch (error) {
    // console.log(error)
    return error.response;
  }
});

//update user
export const updateOneUser = createAsyncThunk("updateOneUser", async ({_id,user}) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/user/${_id}`,
      user,
      {
        headers: {
          "Content-Type":"multipart/form-data",
          authorization: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        },
      }
    );
    return response;
  } catch (error) {
    return error.message;
  }
});

//delete user

export const deleteOneUser = createAsyncThunk("deleteOneUser", async (_id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/user/${_id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        },
      }
    )
    return response
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
    .addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(getSingleUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getSingleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      // console.log(action.payload.data)
    })
    .addCase(getSingleUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    .addCase(updateOneUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateOneUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    })
    .addCase(updateOneUser.rejected, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.error = action.error.message;
    })

    .addCase(deleteOneUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteOneUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    })
    .addCase(deleteOneUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
},
});



export default userSlice.reducer;
