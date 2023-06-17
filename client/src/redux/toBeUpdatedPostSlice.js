import { createSlice } from "@reduxjs/toolkit";

const toBeUpdatedPostSlice = createSlice({
  name: "toBeUpdatedPostData",

  initialState: {
    toBeUpdatedPostData: null,
  },

  reducers: {
    setToBeUpdatedPostData: (state, action) => {
      state.toBeUpdatedPostData = action.payload;
    },
  },
});

export const { setToBeUpdatedPostData } = toBeUpdatedPostSlice.actions;

export default toBeUpdatedPostSlice.reducer;
