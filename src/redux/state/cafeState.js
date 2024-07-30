import { createSlice } from "@reduxjs/toolkit";

export const cafeSlice = createSlice({
  name: "cafe",
  initialState: {
    cafes: [],
    isLoading: false,
    error: null,
    selectedCafe: null,
    mutating: false,
  },
  reducers: {
    getCafes: (state, action) => {
      state.isLoading = true;
    },
    getCafesSuccess: (state, action) => {
      state.cafes = action.payload;
      state.isLoading = false;
    },
    getCafesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createCafe: (state, action) => {
      state.mutating = true;
    },
    createCafeSuccess: (state, action) => {
      state.cafes.push(action.payload);
      state.mutating = false;
    },
    createCafeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
    deleteCafe: (state, action) => {
      state.mutating = true;
    },
    deleteCafeSuccess: (state, action) => {
      state.cafes = state.cafes.filter((cafe) => cafe.id !== action.payload);
      state.mutating = false;
    },
    deleteCafeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
    getCafe: (state, action) => {
      state.isLoading = true;
    },
    getCafeSuccess: (state, action) => {
      state.selectedCafe = action.payload;
      state.isLoading = false;
    },
    getCafeFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateCafe: (state, action) => {
      state.mutating = true;
    },
    updateCafeSuccess: (state, action) => {
      state.cafes = state.cafes.map((cafe) => {
        if (cafe.id === action.payload.id) {
          return action.payload;
        }
        return cafe;
      });
      state.mutating = false;
    },
    updateCafeFailure: (state, action) => {
      state.error = action.payload;
      state.mutating = false;
    },
  },
});

export const {
  getCafes,
  getCafesSuccess,
  getCafesFailure,
  createCafe,
  createCafeSuccess,
  createCafeFailure,
  deleteCafe,
  deleteCafeSuccess,
  deleteCafeFailure,
  getCafe,
  getCafeSuccess,
  getCafeFailure,
  updateCafe,
  updateCafeSuccess,
  updateCafeFailure,
} = cafeSlice.actions;

export default cafeSlice.reducer;
