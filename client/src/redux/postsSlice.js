import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    isFetching: false,
    posts: [],
  },

  reducers: {
    postsFetchingStart: (initialState) => {
      initialState.isFetching = true;
    },

    postsFetchingSuccess: (initialState, action) => {
      initialState.posts = action.payload;
      initialState.isFetching = false;
    },

    addPost: (initialState, action) => {
      // It will add item at index 0 and it changes original array.
      initialState.posts.splice(0, 0, action.payload);
      initialState.isFetching = false;
    },

    removePost: (initialState, action) => {
      initialState.posts = initialState.posts.filter((post) => {
        return post._id !== action.payload;
      });
    },

    updatePostState: (initialState, action) => {
      initialState.posts = initialState.posts.map((post) => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
        return post;
      });

      initialState.isFetching = false;
    },
  },
});

export const {
  postsFetchingStart,
  postsFetchingSuccess,
  updatePostState,
  addPost,
  removePost,
} = postsSlice.actions;
export default postsSlice.reducer;
