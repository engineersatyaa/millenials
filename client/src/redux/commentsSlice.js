import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",

  initialState: {
    isFetching: false,
    comments: [],
    isError: false,
  },

  reducers: {
    commentsFetchingStart: (state) => {
      state.isFetching = true;
    },

    commentsFetchingSuccess: (state, action) => {
      state.comments = action.payload;
      state.isFetching = false;
    },

    commentsFetchingFailure: (state) => {
      state.isError = true;
      state.isFetching = false;
    },

    addComment: (state, action) => {
      // It will add item at index 0 and it changes original array.
      state.comments.splice(0, 0, action.payload);
    },

    removeComment: (state, action) => {
      state.comments = state.comments.filter((commentObj) => {
        return commentObj._id !== action.payload;
      });
    },

    updateComment: (state, action) => {
      state.comments = state.comments.map((commentObj) => {
        if (commentObj._id === action.payload._id) {
          commentObj = action.payload;
        }
        return commentObj;
      });
    },
  },
});

export const {
  commentsFetchingStart,
  commentsFetchingSuccess,
  commentsFetchingFailure,
  addComment,
  removeComment,
  updateComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
