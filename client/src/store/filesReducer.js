import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONFIG } from "../config";

const INITIAL_STATE = {
  status: "idle",
  error: null,
  entities: [],
};

export const getFiles = createAsyncThunk(
  "files/fetchFiles",
  async (fileName) => {
    const response = await fetch(
      `${CONFIG.API_URL}/files/data${fileName ? `?fileName=${fileName}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Could not fetch files");
    }
    const filesData = await response.json();
    return filesData;
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState: INITIAL_STATE,
  extraReducers(builder) {
    builder
      .addCase(getFiles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = [...action.payload];
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.entities = [];
      });
  },
});

export default filesSlice.reducer;
