import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/agreements";

// Async thunk for fetching agreements
export const fetchAgreements = createAsyncThunk(
  "agreements/fetchAgreements",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Async thunk for creating agreements
export const createAgreement = createAsyncThunk(
  "agreements/createAgreement",
  async (newAgreement) => {
    const response = await axios.post(API_URL, newAgreement);
    return response.data;
  }
);

// Async thunk for updating agreements
export const updateAgreement = createAsyncThunk(
  "agreements/updateAgreement",
  async ({ id, ...updatedAgreement }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedAgreement);
    return response.data;
  }
);

// Async thunk for deleting agreements
export const deleteAgreement = createAsyncThunk(
  "agreements/deleteAgreement",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// Agreement slice
const agreementsSlice = createSlice({
  name: "agreements",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgreements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgreements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAgreements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAgreement.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAgreement.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (agreement) => agreement.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAgreement.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (agreement) => agreement.id !== action.payload
        );
      });
  },
});

export default agreementsSlice.reducer;
