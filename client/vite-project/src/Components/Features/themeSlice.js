

import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: {
    themeKey: true, // Store the theme state as part of an object
  },
  reducers: {
    toggleTheme: (state) => {
      console.log("Before toggle:", state.themeKey);
      state.themeKey = !state.themeKey; // Directly toggle the boolean value
      console.log("After toggle:", state.themeKey);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
