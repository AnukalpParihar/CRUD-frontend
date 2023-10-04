import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get allnotes
export const getAllNotes = createAsyncThunk("getAllNotes", async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/note",
    {
      headers: {
        authorization: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
});

//get singlenote
export const getSingleNote = createAsyncThunk("getSingleNote", async (_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/note/${_id}`,
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
    return error.response;
  }
});
//addnote
export const addNote = createAsyncThunk("addNote", async (note) => {
  try {
    const response = await axios.post("http://localhost:8000/api/note",note, 
    {
      headers: {
        "Content-Type":"application/json",
        authorization: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
});

//updatenote
export const updateOneNote = createAsyncThunk("updateOneNote", async ({_id,note}) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/note/${_id}`,
     note,
      {
        headers: {
          "Content-Type":"application/json",
          authorization: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
});

//deletenote
export const deleteOneNote = createAsyncThunk("deleteOneNote", async (_id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/note/${_id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        },
      }
    )
    console.log(response)
    return response
  } catch (error) {
    return error.response;
  }
});


// Create a slice of the Redux store for managingnote data
const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // Existing code...

extraReducers:(builder) => {
  builder
    .addCase(getAllNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload.data;
    })
    .addCase(getAllNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getSingleNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getSingleNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload.data;
    })
    .addCase(getSingleNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(addNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload
    })
    .addCase(addNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle errors consistently
    })
    .addCase(updateOneNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateOneNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload.data;
    })
    .addCase(updateOneNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle errors consistently
    })
    .addCase(deleteOneNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteOneNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    })
    .addCase(deleteOneNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle errors consistently
    });
}
})



export default noteSlice.reducer;
